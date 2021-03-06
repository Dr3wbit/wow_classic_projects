from django import forms
from home.models import ConsumeList, Spec, Tag


class SpecForm(forms.ModelForm):
    tags = forms.ModelMultipleChoiceField(widget=forms.CheckboxSelectMultiple, queryset=Tag.objects.all(), to_field_name="name", required=False)
    class Meta:
        model = Spec
        fields = ['name', 'description', 'private', 'tags', 'hash']
        widgets = {
            'name': forms.TextInput(attrs={'title': 'What will you name your spec?'}),
            'description': forms.Textarea(attrs={'cols': 60, 'rows': 20}),
            'private': forms.CheckboxInput(attrs={'title':'Check to have your username removed from list when published'})
        }



class ConsumeListForm(forms.ModelForm):
    tags = forms.ModelMultipleChoiceField(widget=forms.CheckboxSelectMultiple, queryset=Tag.objects.all(), to_field_name="name", required=False)
    class Meta:
        model = ConsumeList
        fields = ['name', 'description', 'private', 'tags', 'hash']
        widgets = {
            'name': forms.TextInput(attrs={'title': 'What will you name your list?'}),
            'description': forms.Textarea(attrs={'cols': 60, 'rows': 20}),
            'private': forms.CheckboxInput(attrs={'title':'Check to have your username removed from list when published'})
        }

    def full_clean(self):
        super(ConsumeListForm, self).full_clean()
        try:
            self.instance.validate_unique()
        except forms.ValidationError as e:
            print('validation error in full_clean')
            self._update_errors(e)

class ContactForm(forms.Form):
    subject = forms.CharField(max_length=100)
    message = forms.CharField(widget=forms.Textarea)
    sender = forms.EmailField()
    cc_myself = forms.BooleanField(required=False)
