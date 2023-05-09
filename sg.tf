resource "aws_security_group" "hello_backend" {
  name        = "${var.name}-backend"
  description = "Allow connections to the ${var.name} backend"
  vpc_id      = data.aws_vpc.current.id

  ingress {
    description     = "Permit application access"
    security_groups = [aws_security_group.hello_frontend.id]
    to_port         = var.container_port
    from_port       = var.container_port
    protocol        = "tcp"
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = merge(var.tags, { "Name" = "${var.name}-backend" })
}

resource "aws_security_group" "hello_frontend" {
  name        = "${var.name}-frontend-1"
  description = "Allow connections to the front-end HTTP"
  vpc_id      = data.aws_vpc.current.id

  ingress {
    description = "Permit Intranet HTTP access"
    cidr_blocks = ["0.0.0.0/0"]
    to_port     = 80
    from_port   = 0
    protocol    = "tcp"
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = merge(var.tags, { "Name" = "${var.name}-frontend" })
}

resource "aws_security_group" "db" {
  name        = "${var.name}-db"
  description = "Allow connections to the ${var.name} database"
  vpc_id      = data.aws_vpc.current.id

  ingress {
    description     = "Permit database access"
    security_groups = [aws_security_group.hello_frontend.id]
    to_port         = 5432
    from_port       = 5432
    protocol        = "tcp"
    cidr_blocks      = ["0.0.0.0/0"]
  }

  tags = merge(var.tags, { "Name" = "${var.name}-db" })
}
