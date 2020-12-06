<!-- This Source Code Form is subject to the terms of the Mozilla Public
   - License, v. 2.0. If a copy of the MPL was not distributed with this
   - file, You can obtain one at https://mozilla.org/MPL/2.0/. -->

<template>
    <div class="field search-input-component">
        <SelectComponent
            :name="name"
            :label="label"
            :rules="rules"
            :multiple="multiple"
            :elements="items"
            @search="onSearch"
            @selection="onSelection"
            v-model="selected"
        />
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";
import SelectComponent from "./SelectComponent.vue";
import SelectListItem from "../models/SelectListItem";
import BaseSelectListItem from "../models/BaseSelectListItem";
import _ from "lodash";

@Component({
    components: {
        SelectComponent
    }
})
export default class SearchSelectComponent extends Vue {
    @Prop({ required: true }) private name: string;
    @Prop({ default: "" }) private label: string;
    @Prop({ default: "" }) private rules: string;

    @Prop({ default: false }) private multiple: boolean;
    @Prop({ default: 3 }) private minLength: number;
    @Prop() private elements: SelectListItem[];
    @Prop({ required: true }) private executeSearch: (searchTerm: string) => Promise<BaseSelectListItem[]>;

    private items: SelectListItem[] = [];
    private selected: string | string[] = [];

    @Watch("elements", { immediate: true }) private onElementsChange() {
        if (this.elements) {
            this.items = this.elements;
        }
    }

    private onSearch = _.debounce(this.search, 700);

    private async search(evt: CustomEvent<{ value: string, resultCount: number }>) {
        if (evt.detail.value.length >= this.minLength) {
            const results = await this.executeSearch(evt.detail.value);

            if (this.multiple) {
                // Prevent duplicate values
                this.items = results.filter(x => !(this.selected as string[]).some(y => x.value == y));
            } else {
                this.items = results;
            }
        }
    }

    private onSelection(values: string | string[]) {
        this.$emit("input", values);
        this.$emit("selection", values);
    }
}
</script>
