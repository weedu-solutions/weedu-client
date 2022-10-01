buildImage:
	docker build -t 114700956661.dkr.ecr.us-east-1.amazonaws.com/weedu-client:0.0.11 .
push:
	$$(aws ecr get-login --no-include-email --region us-east-1 --profile weedu)
	docker push 114700956661.dkr.ecr.us-east-1.amazonaws.com/weedu-client:0.0.11