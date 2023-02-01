from django import forms
from .models import CategoryType

class CategoryTypeForm(forms.Form):
    category_type = forms.ModelChoiceField(queryset=CategoryType.objects.all(), empty_label=None)