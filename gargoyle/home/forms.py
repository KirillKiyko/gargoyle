from django import forms
from django.core.exceptions import ValidationError


class ContactForm(forms.Form):
    contact_name = forms.CharField(required=True)
    contact_email = forms.EmailField(required=True)
    content = forms.CharField(required=True)

    def clean_contact_name(self):
        contact_name = self.cleaned_data['contact_name']
        if contact_name == '':
            raise ValidationError('Field Name is required')
        return contact_name


    def clean_contact_email(self):
        contact_email = self.cleaned_data['contact_email']
        if contact_email == '':
            raise ValidationError('Field Email is required')
        return contact_email


    def clean_content(self):
        content = self.cleaned_data['content']
        if content == '':
            raise ValidationError('Enter your message before send email.')
        return content