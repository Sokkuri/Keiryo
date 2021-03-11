<!-- This Source Code Form is subject to the terms of the Mozilla Public
   - License, v. 2.0. If a copy of the MPL was not distributed with this
   - file, You can obtain one at https://mozilla.org/MPL/2.0/. -->

<template>
    <div class="field select-component">
        <ValidationProvider
            tag="div"
            :rules="rules"
            :vid="name"
            v-slot="{ errors }">
            <div class="field-container" :class="{ 'errored': errors.length > 0 }">
                <label class="label" v-if="label">{{ label }}</label>
                <select
                    @change="onSelection()"
                    @search="$emit('search', $event)"
                    v-model="selected"
                    ref="selectElement"
                />
            </div>
        </ValidationProvider>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import SelectListItem from "../models/SelectListItem";
import Choices from "choices.js";
import _ from "lodash";

@Component
export default class SelectComponent extends Vue {
    @Prop({ required: true }) private name: string;
    @Prop({ default: "" }) private label: string;
    @Prop({ default: "" }) private rules: string;

    @Prop({ default: true }) private searchEnabled: boolean;
    @Prop({ default: false }) protected multiple: boolean;
    @Prop({ default: true }) private placeholder: boolean;
    @Prop({ required: true }) private elements: SelectListItem[];

    private selected: string | string[] = [];
    private instance: Choices;

    mounted() {
        const element: HTMLSelectElement = this.$refs.selectElement as HTMLSelectElement;
        element.multiple = this.multiple;

        if (element) {
            this.instance = new Choices(element, {
                searchEnabled: this.searchEnabled,
                choices: [],
                items: [],
                itemSelectText: "",
                loadingText: "",
                removeItemButton: this.multiple
            });

            this.$emit("created", this.instance);
        }

        // When elements are present on creation then update the selection and items.
        if (this.elements.length > 0) {
            this.updateSelection(this.elements);
            this.updateItems(this.elements);
            this.emitSelection();
        }
    }

    beforeDestroy() {
        this.instance.destroy();
    }

    @Watch("elements") onElementChange() {
        this.updateSelection(this.elements);
        this.updateItems(this.elements);
        this.emitSelection();
    }

    private onSelection() {
        this.$nextTick(() => {
            if (!this.multiple) {
                this.updateItems(this.elements);
            }

            this.emitSelection();
        });
    }

    private updateItems(items: SelectListItem[]) {
        // Update item selection
        let updatedElements = items.map(x => ({
            label: x.label,
            value: x.value,
            selected: this.multiple ? (this.selected as string[]).some(y => x.value == y) : (this.selected as string) == x.value
        } as SelectListItem));

        // Add placeholder when its necessary
        if (this.placeholder && !this.multiple && !updatedElements.some(x => x.selected)) {
            updatedElements.unshift({
                label: "",
                value: null,
                selected: true,
                disabled: true
            });

            this.instance.setValue([ "" ]);
        }

        // Update choices
        this.instance.clearChoices();
        this.instance.clearStore();
        this.instance.setChoices(updatedElements);
    }

    private updateSelection(items: SelectListItem[]) {
        const selectedItems = items.filter(x => x.selected && x.value);
        this.selected = this.multiple ? selectedItems.map(x => x.value) : _.first(selectedItems)?.value;
    }

    private emitSelection() {
        this.$emit("input", this.selected);
        this.$emit("selection", this.selected);
    }
}
</script>

<style lang="scss">
@use "../colors.scss";

.select-component {
    .errored {
        .choices__inner {
            border-color: colors.$color-attention;
        }
    }
}
</style>
