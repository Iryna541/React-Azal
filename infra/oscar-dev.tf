resource "aws_elastic_beanstalk_environment" "eb_dev_env" {
  name                = "${var.elasticbeanstalk_app_name}-Dev"
  application         = aws_elastic_beanstalk_application.eb_app.name
  solution_stack_name = "64bit Amazon Linux 2023 v4.2.1 running Docker"

  setting {
    namespace = "aws:elasticbeanstalk:environment"
    name      = "LoadBalancerType"
    value     = "application"
  }

  setting {
    namespace = "aws:elasticbeanstalk:cloudwatch:logs"
    name      = "StreamLogs"
    value     = true
  }

  setting {
    namespace = "aws:elasticbeanstalk:cloudwatch:logs"
    name      = "RetentionInDays"
    value     = "7"
  }

  setting {
    namespace = "aws:elasticbeanstalk:cloudwatch:logs"
    name      = "DeleteOnTerminate"
    value     = true
  }

  setting {
    namespace = "aws:autoscaling:launchconfiguration"
    name      = "IamInstanceProfile"
    value     = "aws-elasticbeanstalk-ec2-role"
  }

  setting {
    namespace = "aws:ec2:instances"
    name      = "InstanceTypes"
    value     = "t2.micro"
  }
}

resource "aws_cloudfront_distribution" "oscar_dev_cf" {
  enabled         = true
  is_ipv6_enabled = true
  aliases         = ["oscar.azal.io"]

  origin {
    domain_name = aws_elastic_beanstalk_environment.eb_dev_env.cname
    origin_id   = "EBEnv"

    custom_origin_config {
      http_port              = 80
      https_port             = 443
      origin_protocol_policy = "http-only"
      origin_ssl_protocols   = ["TLSv1.2"]
    }
  }


  default_cache_behavior {
    allowed_methods  = ["DELETE", "GET", "HEAD", "OPTIONS", "PATCH", "POST", "PUT"]
    cached_methods   = ["GET", "HEAD"]
    target_origin_id = "EBEnv"
    forwarded_values {
      query_string = false
      cookies {
        forward = "none"
      }
    }
    viewer_protocol_policy = "redirect-to-https"
    min_ttl                = 0
    default_ttl            = 3600
    max_ttl                = 86400
  }

  viewer_certificate {
    acm_certificate_arn = "arn:aws:acm:us-east-1:859989146907:certificate/c718c337-971e-4a3f-9f4a-1e6689d5909f"
    ssl_support_method  = "sni-only"
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }
}

# resource "aws_route53_zone" "oscar_dev" {
#   name = "oscar-dev.azal.io"
# }

# resource "aws_route53_record" "oscar_dev_a" {
#   zone_id = aws_route53_zone.oscar_dev.zone_id
#   name    = "oscar-dev.azal.io"
#   type    = "A"
#   alias {
#     name                   = aws_cloudfront_distribution.oscar_dev_cf.domain_name
#     zone_id                = aws_cloudfront_distribution.oscar_dev_cf.hosted_zone_id
#     evaluate_target_health = false
#   }
# }
