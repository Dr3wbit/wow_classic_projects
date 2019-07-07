from django import forms
from home.models import ConsumeList, Spec


class SpecForm(forms.ModelForm):
    class Meta:
        model = Spec
        fields = ['name', 'description', 'private']
        
class ConsumeListForm(forms.ModelForm):
    class Meta:
        model = ConsumeList
        fields = ['name', 'description', 'private']


class ContactForm(forms.Form):
    subject = forms.CharField(max_length=100)
    message = forms.CharField(widget=forms.Textarea)
    sender = forms.EmailField()
    cc_myself = forms.BooleanField(required=False)
