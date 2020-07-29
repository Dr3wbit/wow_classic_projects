from django.test import TestCase

### site navigation ###

## test site navigation after logging in as normal user ##
## test site navigation after logging in as superuser ##
## test site navigation logged out ##

## test site navigation in various screen sizes ##
# https://www.hobo-web.co.uk/best-screen-size/
# 360×640 – 10.14%
# 1366×768 – 9.67%
# 1920×1080 – 8.35%
# 375×667 – 4.24%
# 414×896 – 3.62%
# 1536×864 – 3.55%
# 360×780 – 3.14%
# 1440×900 – 3.03%

# test if can navigate to index
# test if can not navigate to index/?#
# test if can not navigate to index from talent_calc
# test if can not navigate to index from profession_tool

# test if can navigate to talent_calc
# test if can navigate to talent_calc and then select a class
# test if can navigate directly to talent_calc/CLASS
# test if can navigate directly to saved spec via talent_calc/CLASS?HASH
# test if can not navigate to talent_calc?HASH

# test if can navigate to profession_tool
# test if can navigate to profession_tool and then select a profession
# test if can navigate directly to profession_tool/PROFESSION
# test if can navigate directly to saved consume list via profession_tool?HASH
# test if can navigate directly to saved consume list via profession_tool/PROFESSION?HASH


### social auth ###

# test can login via discord #
# test canceling logout redirects to previous page#

### saved lists ###

# test if can save consume list
# test if can save saved spec
# test if can delete saved consume list
# test if can delete saved spec

# save spec, test if can delete it immediately
# save consume list, test if can delete it immediately

# test if clicking img icon pulls up modal
# click img icon to pull up modal, test if images populate

# click img icon to pull up modal, press escape, test if modal closed

# test if can change icon for spec
# test if can change icon for consume list

# save spec, test if can change icon without page reload
# save consume list, test if can change icon without page reload

# test if can delete saved consume list from talent_calc page
# test if can delete saved spec from profession_tool page

### voting ###

# test can vote if logged in
# test if cannot vote while logged out
# test cannot vote more than once per item
