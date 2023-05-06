terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.0"
    }
  }
}
provider "aws" {
  region = "us-east-1"
  profile = "default"
  
  default_tags {
    tags = {
      Name = "todo-list"
    }
  }
}

resource "aws_ecs_task_definition" "main" {
  family                   = "magz-app"
  network_mode             = "awsvpc"
  requires_compatibilities = ["FARGATE"]
  cpu                      = 1024
  memory                   = 2048

container_definitions = jsonencode([
    {
      "image": "magz999/todo",
      "cpu": 1024,
      "memory": 2048,
      "name": "magz-app",
      "networkMode": "awsvpc",
      "portMappings": [
        {
          "containerPort": 3000,
          "hostPort": 3000
        }
      ],
      "logConfiguration": {
        "logDriver": "awslogs",
        "options": {
          "awslogs-group": "/ecs/magz-app",
          "awslogs-region": var.aws_region,
          "awslogs-stream-prefix": "magz-app"
        }
      },
      "environment": [
        {
          "name": "PGDATABASE",
          "value": var.database_name
        },
        {
          "name": "PGUSER",
          "value": var.database_username
        },
        {
          "name": "PGPASSWORD",
          "value": var.database_password
        },
        {
          "name": "PGHOST",
          "value": aws_db_instance.postgres_db.endpoint
        }
      ]
    }
  ])
}

resource "aws_ecs_cluster" "main" {
  name = "main"
}

resource "aws_ecs_service" "default" {
  name            = "default-service"
  cluster         = aws_ecs_cluster.main.id
  task_definition = aws_ecs_task_definition.main.arn
  desired_count   = var.app_count
  launch_type     = "FARGATE"

  network_configuration {
    security_groups = [aws_security_group.default.id]
    subnets         = aws_subnet.private.*.id
  }

  load_balancer {
    target_group_arn = aws_lb_target_group.default.id
    container_name   = "magz-app"
    container_port   = 3000
  }

  depends_on = [aws_lb_listener.default]
}

resource "aws_db_instance" "postgres_db" {
  engine            = "postgres"
  instance_class    = "db.t3.micro"
  allocated_storage = 20
  storage_type      = "gp2"
  identifier        = var.database_name
  username          = var.database_username
  password          = var.database_password
  port              = 5432
  publicly_accessible = false
  vpc_security_group_ids = [aws_security_group.rds.id]
  db_subnet_group_name = aws_db_subnet_group.db_subnet_group.name
  skip_final_snapshot     = true
}
