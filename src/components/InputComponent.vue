<!-- This Source Code Form is subject to the terms of the Mozilla Public
   - License, v. 2.0. If a copy of the MPL was not distributed with this
   - file, You can obtain one at https://mozilla.org/MPL/2.0/. -->

<template>
    <div class="field input-component">
        <ValidationProvider
            tag="div"
            :rules="rules"
            :vid="name"
            v-slot="{ errors }">
            <div :class="{ errored: errors.length > 0 }">
                <label class="label" v-if="label">{{ label }}</label>
                <input
                    ref="inputElement"
                    class="input"
                    @input="onInput()"
                    v-model="internalValue"
                    :type="type"
                    :name="name"
                    :maxlength="maxlength"
                    :placeholder="placeholder"
                />
            </div>
        </ValidationProvider>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";

@Component
export default class InputComponent extends Vue {
    @Prop({ required: true }) private name: string;
    @Prop({ default: "" }) private label: string;
    @Prop({ default: "" }) private rules: string;

    @Prop({ default: "text" }) private type: string;
    @Prop({ default: 255 }) private maxlength: number;
    @Prop() private placeholder: string;

    @Prop() private value: unknown;
    private internalValue: unknown = null;

    @Watch("value", { immediate: true }) onValueChange() {
        this.internalValue = this.value;
        this.$emit("input", this.internalValue);
    }

    public focus() {
        const element = this.$refs.inputElement as HTMLInputElement;
        element.focus();
    }

    private onInput() {
        this.$emit("input", this.internalValue);
    }
}
</script>

<style lang="scss">
@use "../colors.scss";

.input-component {
    .errored {
        input {
            border-color: colors.$color-attention;
        }
    }
}
</style>
