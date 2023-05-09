output "alb_dns_name" {
  value = module.alb.lb_dns_name
}

output "db_dns_name" {
  value = aws_db_instance.db.address
}