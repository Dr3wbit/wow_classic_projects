import invariables as const
import os, re, urllib.request, json, time, datetime, random

all_errors = const.ALL_ERRORS

for ix,v in all_errors.items():
    print('ix: ', ix)
    print('v: ', v)
    if ix == 'missing_tabs':
        continue
    else:
        # if 'created_by' in v.keys():
        #     all_errors['missing_tabs']['tab-created-by']['count'] += 1
        #     if "i" not in all_errors['missing_tabs']['tab-created-by'].keys():
        #         all_errors['missing_tabs']['tab-created-by']['i'] = []
        #
        #     all_errors['missing_tabs']['tab-created-by']['i'].append(int(ix))
        #
        # elif 'reagant_for' in v.keys():
        #     all_errors['missing_tabs']["tab-reagent-for"]['count'] += 1
        #     if "i" not in all_errors['missing_tabs']["tab-reagent-for"].keys():
        #         all_errors['missing_tabs']["tab-reagent-for"]['i'] = []
        #
        #     all_errors['missing_tabs']["tab-reagent-for"]['i'].append(int(ix))

        if "reward_from" in v.keys():
            all_errors['missing_tabs']["tab-reward-of"]['count'] += 1
            if "i" not in all_errors['missing_tabs']["tab-reward-of"].keys():
                all_errors['missing_tabs']["tab-reward-of"]['i'] = []

            all_errors['missing_tabs']["tab-reward-of"]['i'].append(int(ix))

        else:
            print("no match found")

with open(os.path.abspath('../js/ERRORS.js'), 'w+') as f:
	json.dump(all_errors, f, indent=4)
