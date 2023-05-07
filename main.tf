data "aws_availability_zones" "available_zones" {
  state = "available"
}

# Create VPC
resource "aws_vpc" "default" {
  cidr_block = "10.0.0.0/16"
  enable_dns_hostnames = true
}

# Create internet gateway
resource "aws_internet_gateway" "default" {
  vpc_id = aws_vpc.default.id
}

# Create route table
resource "aws_route_table" "public" {
  vpc_id = aws_vpc.default.id

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.default.id
  }
}

# Create subnet
resource "aws_subnet" "public" {
  count                   = 2
  vpc_id                  = aws_vpc.default.id
  cidr_block              = cidrsubnet(aws_vpc.default.cidr_block, 8, count.index)
  availability_zone       = data.aws_availability_zones.available_zones.names[count.index]
  map_public_ip_on_launch = true
}

# Create security group for ECS task
resource "aws_security_group" "ecs_task_sg" {
  name        = "ecs-task-security-group"
  description = "Security group for ECS task"

  vpc_id = aws_vpc.default.id

  ingress {
    from_port   = 0
    to_port     = 65535
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

# Create ECS cluster
resource "aws_ecs_cluster" "default" {
  name = "ecs-cluster"
}

# Create task definition
resource "aws_ecs_task_definition" "default" {
  family                   = "ecs-task"
  execution_role_arn       = aws_iam_role.ecs_task_execution_role.arn
  network_mode             = "awsvpc"
  requires_compatibilities = ["FARGATE"]

  container_definitions = <<DEFINITION
[
  {
    "name": "todo-app",
    "image": "magz999/todo",
    "essential": true,
    "portMappings": [
      {
        "containerPort": 3000,
        "hostPort": 3000,
        "protocol": "tcp"
      }
    ],
    "environment": [
      {
        "name": "DATABASE_HOST",
        "value": "${aws_db_instance.postgres_db.address}"
      },
      {
        "name": "DATABASE_PORT",
        "value": "${aws_db_instance.postgres_db.port}"
      },
      {
        "name": "DATABASE_NAME",
        "value": "${var.database_name}"
      },
      {
        "name": "DATABASE_USERNAME",
        "value": "${var.database_username}"
      },
      {
        "name": "DATABASE_PASSWORD",
        "value": "${var.database_password}"
      }
    ]
  }
]
DEFINITION
  cpu               = "256"
  memory            = "512"
  tags = {
    Name = "todo-app-task"
  }
}

# Create ECS service
resource "aws_ecs_service" "default" {
  name            = "ecs-service"
  cluster         = aws_ecs_cluster.default.id
  task_definition = aws_ecs_task_definition.default.arn
  desired_count   = var.app_count
  launch_type     = "FARGATE"

  network_configuration {
    security_groups = [aws_security_group.ecs_task_sg.id]
    subnets            = [for subnet in aws_subnet.public : subnet.id]
  }

  load_balancer {
    target_group_arn = aws_lb_target_group.default.id
    container_name   = "todo-app"
    container_port   = 3000
  }

  depends_on = [aws_lb_listener.default]
}

resource "aws_db_subnet_group" "default" {
  name       = "db-subnet-group"
  subnet_ids  = [aws_subnet.public[0].id, aws_subnet.public[1].id]
}

# Create RDS PostgreSQL database
resource "aws_db_instance" "postgres_db" {
  engine            = "postgres"
  instance_class    = "db.t3.micro"
  allocated_storage = 20
  storage_type      = "gp2"
  identifier        = var.database_name
  username          = var.database_username
  password          = var.database_password
  port              = 5432
  publicly_accessible = true  
  vpc_security_group_ids = [aws_security_group.rds.id]
  db_subnet_group_name = aws_db_subnet_group.default.name
  skip_final_snapshot     = true
}

# Create RDS security group
resource "aws_security_group" "rds" {
  name        = "rds-security-group"
  description = "Security group for RDS"
  vpc_id      = aws_vpc.default.id

  ingress {
    protocol    = "-1"
    from_port   = 0
    to_port     = 0
    cidr_blocks = ["0.0.0.0/0"]
  }
}

# Create default route table association
resource "aws_route_table_association" "public" {
  count          = 2
  subnet_id      = aws_subnet.public[count.index].id
  route_table_id = aws_route_table.public.id
}

# Create IAM role for ECS task execution
resource "aws_iam_role" "ecs_task_execution_role" {
  name = "ecs-task-execution-role"

  assume_role_policy = <<POLICY
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Service": "ecs-tasks.amazonaws.com"
      },
      "Action": "sts:AssumeRole"
    }
  ]
}
POLICY
}

# Attach required policies to ECS task execution role
resource "aws_iam_role_policy_attachment" "ecs_task_execution_role_policy_attachment" {
  role       = aws_iam_role.ecs_task_execution_role.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AmazonECSTaskExecutionRolePolicy"
}


resource "aws_lb_target_group" "default" {
  name     = "todo-app-target-group"
  port     = 3000
  protocol = "HTTP"
  vpc_id   = aws_vpc.default.id
  target_type   = "ip"

  health_check {
    path                = "/"
    interval            = 30
    timeout             = 10
    healthy_threshold   = 3
    unhealthy_threshold = 3
    matcher             = "200-299"
  }
}

resource "aws_lb_listener" "default" {
  load_balancer_arn = aws_lb.default.arn
  port              = 80
  protocol          = "HTTP"
  default_action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.default.arn
  }
}

resource "aws_lb" "default" {
  name               = "todo-app-lb"
  load_balancer_type = "application"
  subnets            = [aws_subnet.public[0].id, aws_subnet.public[1].id]

  tags = {
    Name = "todo-app-lb"
  }
}

output "load_balancer_dns" {
  value = aws_lb.default.dns_name
}
