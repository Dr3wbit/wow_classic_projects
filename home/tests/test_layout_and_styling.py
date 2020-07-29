from .layout_and_styling import LayoutAndStylingTest
from .base import sanitize

DEVICES = ["iPhone X"]
# DEVICES = ["iPhone X", "Pixel 2", "Galaxy S5"]

# DEVICES = [
# 	"iPhone X", "Moto G4", "Galaxy S5", "iPhone 6", "iPhone 7", "iPhone 8", "Pixel 2",
# 	"Pixel 2 XL", "iPhone 6 Plus", "iPhone 7 Plus", "iPhone 8 Plus", "iPad", "iPad Pro"
# ]

for device in DEVICES:
	sanitized = sanitize(device)
	# test_func = create_test_function(name, params[0], params[1])
	klassname = 'LayoutAndStyling_{0}'.format(sanitized)
	globals()[klassname] = type(klassname,(LayoutAndStylingTest,), {'device':device})
