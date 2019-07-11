from django import forms
from home.models import ConsumeList, Spec, Tag


class SpecForm(forms.ModelForm):
    tags = forms.ModelMultipleChoiceField(widget=forms.CheckboxSelectMultiple, queryset=Tag.objects.all(), to_field_name="name", required=False)
    class Meta:
        model = Spec
        fields = ['name', 'description', 'private', 'tags']


class ConsumeListForm(forms.ModelForm):
    tags = forms.ModelMultipleChoiceField(widget=forms.CheckboxSelectMultiple, queryset=Tag.objects.all(), to_field_name="name", required=False)
    class Meta:
        model = ConsumeList
        fields = ['name', 'description', 'private', 'tags']


class ContactForm(forms.Form):
    subject = forms.CharField(max_length=100)
    message = forms.CharField(widget=forms.Textarea)
    sender = forms.EmailField()
    cc_myself = forms.BooleanField(required=False)
