resource "aws_ecs_cluster" "hello" {
  name = var.name

  setting {
    name  = "containerInsights"
    value = "disabled"
  }
}

resource "aws_ecs_service" "hello" {
  name            = var.name
  cluster         = aws_ecs_cluster.hello.id
  task_definition = aws_ecs_task_definition.hello.arn
  desired_count   = 1
  launch_type     = "FARGATE"

  load_balancer {
    target_group_arn = module.alb.target_group_arns[0]
    container_name   = "hello-world-rest"
    container_port   = var.container_port
  }

  network_configuration {
    subnets         = aws_subnet.public[*].id
    security_groups = [aws_security_group.hello_backend.id]
    assign_public_ip = true
  }

  tags = var.tags
}

resource "aws_ecs_task_definition" "hello" {
  family = var.name

  cpu    = var.ecs_cpu
  memory = var.ecs_memory

  requires_compatibilities = ["FARGATE"]
  network_mode             = "awsvpc"

  execution_role_arn = aws_iam_role.ecs_service.arn
  task_role_arn      = aws_iam_role.ecs_task.arn

  tags = var.tags

  container_definitions = jsonencode([
    {
      name      = "hello-world-rest"
      image     = var.ecs_image
      essential = true
      portMappings = [
        {
          containerPort = var.frontend_port
          hostPort      = var.frontend_port
        },
        {
          containerPort = var.backend_port
          hostPort      = var.backend_port
        }
      ]
      logConfiguration = {
        logDriver = "awslogs"
        options = {
          awslogs-group         = aws_cloudwatch_log_group.log_group.name
          awslogs-region        = var.aws_region
          awslogs-stream-prefix = "ecs"
        }
      }
      environment = [
        {
          name  = "PORT"
          value = "5432"
        },
        {
          name  = "PGHOST"
          value = aws_db_instance.db.address
        },
        {
          name  = "PGUSER"
          value = var.db_user
        },
        {
          name  = "PGPASS"
          value = var.db_pass
        },
        {
          name  = "DB_NAME"
          value = var.db_name
        }
      ]
    }
  ])
}

resource "aws_db_instance" "db" {
  allocated_storage    = 10
  db_name              = var.db_name
  engine               = "postgres"
  engine_version       = "14.6"
  instance_class       = "db.t3.micro"
  username             = "main"
  password             = var.db_pass
  skip_final_snapshot  = true
  db_subnet_group_name = aws_db_subnet_group.default.name

  vpc_security_group_ids = ["${aws_security_group.db.id}"]
}

resource "aws_db_subnet_group" "default" {
  name       = "db-subnet-group-1"
  subnet_ids    = aws_subnet.public[*].id
}
