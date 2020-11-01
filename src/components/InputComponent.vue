<!-- This Source Code Form is subject to the terms of the Mozilla Public
   - License, v. 2.0. If a copy of the MPL was not distributed with this
   - file, You can obtain one at https://mozilla.org/MPL/2.0/. -->

<template>
    <div class="field input-component">
        <ValidationProvider :rules="rules" :vid="name" v-slot="{ errors }">
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
                />
            </div>
        </ValidationProvider>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { ValidationProvider } from "vee-validate";

@Component
export default class InputComponent extends Vue {
    @Prop({ required: true }) private name: string;
    @Prop({ default: "" }) private label: string;
    @Prop({ default: "" }) private rules: string;

    @Prop({ default: "text" }) private type: string;
    @Prop({ default: 255 }) private maxlength: number;
    @Prop({ default: false }) private focus: boolean;

    @Prop() private value: unknown;
    private internalValue: unknown = null;

    mounted() {
        if (this.focus) {
            const element = this.$refs.inputElement as HTMLInputElement;
            element.focus();
        }
    }

    @Watch("value") onValueChange() {
        this.internalValue = this.value;
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