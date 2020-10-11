<!-- This Source Code Form is subject to the terms of the Mozilla Public
   - License, v. 2.0. If a copy of the MPL was not distributed with this
   - file, You can obtain one at https://mozilla.org/MPL/2.0/. -->

<template>
    <div class="captcha-component">
        <vue-hcaptcha ref="captcha" v-if="siteKey" @verify="onVerify" :sitekey="siteKey" :theme="'dark'" :size="size"></vue-hcaptcha>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import VueHcaptcha, { HCaptchaMethods } from "@hcaptcha/vue-hcaptcha";

@Component({
    components: {
        VueHcaptcha
    }
})
export default class CaptchaComponent extends Vue {
    @Prop({ required: true }) private siteKey: string;
    @Prop({ default: true }) private visible: boolean;

    private size: string;

    created() {
        this.size = this.visible ? "normal": "invisible";
    }

    public execute() {
        (this.$refs.captcha as unknown as HCaptchaMethods).execute();
    }

    private onVerify(response: string) {
        this.$emit("verify", response);
        this.$emit("input", response);
    }
}
</script>
