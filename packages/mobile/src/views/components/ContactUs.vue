<template>
  <div class="contact">
    <section class="card">
      <div class="field" v-for="(item, i) in fields" :key="i">
        <p class="label">{{ $t(item.labelKey) }}</p>
        <p class="value">
          <a v-if="item.href" :href="item.href">{{ resolved(item) }}</a>
          <template v-else>{{ resolved(item) }}</template>
        </p>
      </div>
    </section>

    <img class="map" src="@/assets/img/Contactus2_03.png" alt="contact" />
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

defineOptions({
  name: 'ContactUsPage'
})

const { t } = useI18n()

type Field = {
  /** 字段名（标题）语言 key */
  labelKey: string
  /** 字段值语言 key 或直接的固定值（二者取其一） */
  valueKey?: string
  value?: string
  href?: string
}

/** 联系方式：与桌面端 ContactUs.vue 使用同一批语言包 key */
const fields: Field[] = [
  { labelKey: 'ContactUs_01', valueKey: 'ContactUs_02' },
  { labelKey: 'ContactUs_03', valueKey: 'ContactUs_04' },
  {
    labelKey: 'ContactUs_06',
    value: 'amal@arabimexports.org',
    href: 'mailto:amal@arabimexports.org'
  },
  { labelKey: 'ContactUs_07', value: '00201110111095', href: 'tel:00201110111095' },
  { labelKey: 'ContactUs_08', value: 'www.arabimexports.org', href: 'http://www.arabimexports.org' },
  { labelKey: 'ContactUs_09', valueKey: 'ContactUs_10' }
]

function resolved(item: Field) {
  return item.valueKey ? t(item.valueKey) : (item.value ?? '')
}
</script>

<style scoped lang="scss">
.contact {
  padding: 4px 0 16px;
}

.card {
  background: #fff;
  border-radius: 8px;
  padding: 14px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
  margin-bottom: 12px;
}

.field {
  & + .field {
    margin-top: 12px;
  }

  .label {
    font-size: 13.5px;
    font-weight: 700;
    color: var(--vt-c);
    margin-bottom: 2px;
  }

  .value {
    font-size: 13.5px;
    line-height: 1.7;
    color: #555;
    word-break: break-all;

    a {
      color: #555;
    }
  }
}

.map {
  width: 100%;
  border-radius: 8px;
  display: block;
}
</style>
