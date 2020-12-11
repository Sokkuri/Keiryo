/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

import SelectListItem from "../models/SelectListItem";

export default class SelectListItemUtils {
    public static getItems<T = string>(values: T[], labelSelector: (label: T) => string, valueSelector: (value: T) => string, selectedValues?: string[]) {
        return values.map(x =>({
            label: labelSelector(x),
            value: valueSelector(x),
            selected: selectedValues?.some(y => this.equalsIgnoreCase(valueSelector(x), y))
        } as SelectListItem));
    }

    private static equalsIgnoreCase(source: string, expected: string): boolean {
        const pattern = new RegExp(expected, "i");
        return pattern.test(source);
    }
}
