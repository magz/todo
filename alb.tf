module "alb" {
  source  = "terraform-aws-modules/alb/aws"
  version = "~> 7.0"

  name = var.name

  load_balancer_type = "application"

  # For the demo, expose this publicly
  internal = false

  vpc_id          = aws_vpc.vpc.id
  subnets         = aws_subnet.public[*].id
  security_groups = [aws_security_group.hello_frontend.id]

  target_groups = [
    {
      name             = "${var.name}-backend"
      backend_protocol = "HTTP"
      backend_port     = var.backend_port
      target_type      = "ip"
      health_check = {
        path                = "/"
        healthy_threshold   = 3
        interval            = 60
        unhealthy_threshold = 10
      }
    },
        {
      name             = "${var.name}-frontend"
      backend_protocol = "HTTP"
      backend_port     = var.frontend_port
      target_type      = "ip"
      health_check = {
        path                = "/"
        healthy_threshold   = 3
        interval            = 60
        unhealthy_threshold = 10
      }
    }
  ]

  http_tcp_listeners = [
    {
      port               = 3000
      protocol           = "HTTP"
      target_group_index = 0
    },
    {
      port               = 80
      protocol           = "HTTP"
      target_group_index = 1
    }
  ]

  tags = merge(var.tags, { "Name" = "${var.name}" })
}
