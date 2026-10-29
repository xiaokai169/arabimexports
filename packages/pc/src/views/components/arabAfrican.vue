<template>
  <div class="div-flex">
    <div style="padding-left: 20px; width: 100%" class="bg_box pre_bgc_one">
      <p>
        {{ $t('arabAfrican_01') }}
      </p>
      <p style="font-weight: bold; font-size: 18px">{{ $t('arabAfrican_0') }}</p>
      <p>
        {{ $t('arabAfrican_02') }}
        
      </p>
      <p>
        {{ $t('arabAfrican_03') }}
      </p>
      <p>
        {{ $t('arabAfrican_04')  }}
      </p>
      <p>
       {{ $t('arabAfrican_05')  }}
      </p>
      <p>{{ $t('arabAfrican_06') }}</p>
      <p>
        {{ $t('arabAfrican_07')  }}
      </p>
      <p>
       {{ $t('arabAfrican_08')   }}
      </p>
      <p>
       {{ $t('arabAfrican_09')   }}
      </p>
      <p>
       {{ $t('arabAfrican_10')    }}
      </p>
      <p style="font-weight: bold; font-size: 18px">{{ $t('arabAfrican_11') }}</p>

      <p>
        {{ $t('arabAfrican_12')   }}
      </p>
      <p>
       {{ $t('arabAfrican_13')    }}
      </p>
      <p>
       {{ $t('arabAfrican_14')     }}
      </p>
      <p>{{ $t('arabAfrican_15')  }}</p>
      <p>
       {{ $t('arabAfrican_16')    }}
      </p>
      <p>
        {{ $t('arabAfrican_17')    }}
      </p>
      <p>
       {{ $t('arabAfrican_18')     }}
      </p>
      <p>
       {{ $t('arabAfrican_19')      }}
      </p>
      <p>
        {{ $t('arabAfrican_20')      }}
      </p>
      <p>
        {{ $t('arabAfrican_21')       }}
      </p>
      <p>
       {{ $t('arabAfrican_22')         }}
      </p>
      <p>{{ $t('arabAfrican_23') }}</p>
      <p>
        {{ $t('arabAfrican_24')           }}
      </p>
      <p>{{ $t('arabAfrican_25') }}</p>
      <p>{{ $t('arabAfrican_26') }}</p>
      <p>{{ $t('arabAfrican_27') }}</p>

      <!-- <p>{{ $t('arabAfrican_1') }}</p>
      <p>{{ $t('arabAfrican_2') }}</p>
      <p>{{ $t('arabAfrican_3') }}</p>
      <p>{{ $t('arabAfrican_4') }}</p>
      <p>{{ $t('arabAfrican_5') }}</p>
      <p>{{ $t('arabAfrican_6') }}</p>
      <p>{{ $t('arabAfrican_7') }}</p>
      <p>{{ $t('arabAfrican_8') }}</p>
      <p>{{ $t('arabAfrican_9') }}</p> -->
    </div>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: 'arabAfrican'
})

//emit
</script>

<style lang="scss" scoped>
.bg_box {
  position: relative;
  overflow: hidden;
  padding-top: 20px;
}
p {
  line-height: 30px;
  // text-align: left;
}
.left_img {
  width: calc(100% / 6 - 10px);
}
.item {
  width: calc(100% / 5 - 29px);
  border-radius: 12px;
  padding: 16px;
  padding-right: 10px;
  height: 372px;
  background: rgba(1, 104, 221, 1);
  opacity: 0.8;
}
</style>
