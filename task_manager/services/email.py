from django.core.mail import send_mail
import uuid
from ..models import EmailVerification
 
def send_email(user):
    token=str(uuid.uuid4())
    EmailVerification.objects.create(user=user,token=token)
    send_mail(
        subject='email vertification',
        message=f'hello, this is your link to vertification: http://localhost:3000/email_confirm?token={token}',
        from_email='noreply@taskFrenzy.com',
        recipient_list=[user.email],
        fail_silently=False
    )