
// 穴位中文名到拼音的映射表 (对应 images/ 文件夹下的 .jpg 文件)
// 增加了简繁体兼容，确保无论数据源如何变化都能找到图片
export const ACUPOINT_PINYIN_MAP = {
  // 肺经
  "少商": "shaoshang", "鱼际": "yuji", "太渊": "taiyuan", "经渠": "jingqu", "尺泽": "chize", "尺澤": "chize",
  // 大肠经
  "商阳": "shangyang", "商陽": "shangyang", "二间": "erjian", "三间": "sanjian", "阳溪": "yangxi", "陽溪": "yangxi", "曲池": "quchi",
  // 胃经
  "厉兑": "lidui", "内庭": "neiting", "陷谷": "xiangu", "解溪": "jiexi", "解谿": "jiexi", "足三里": "zusanli",
  // 脾经
  "隐白": "yinbai", "大都": "dadu", "太白": "taibai", "商丘": "shangqiu", "阴陵泉": "yinlingquan", "阴陵": "yinlingquan",
  // 心经
  "少冲": "shaochong", "少沖": "shaochong", "少府": "shaofu", "神门": "shenmen", "灵道": "lingdao", "少海": "shaohai",
  // 小肠经
  "少泽": "shaoze", "少澤": "shaoze", "前谷": "qiangu", "后溪": "houxi", "阳谷": "yanggu", "陽谷": "yanggu", "小海": "xiaohai",
  // 膀胱经
  "至阴": "zhiyin", "至陰": "zhiyin", "足通谷": "zutonggu", "束骨": "shugu", "昆仑": "kunlun", "委中": "weizhong",
  // 肾经
  "涌泉": "yongquan", "然谷": "rangu", "太溪": "taixi", "太谿": "taixi", "复溜": "fuliu", "復溜": "fuliu", "阴谷": "yingu", "陰谷": "yingu",
  // 心包经
  "中冲": "zhongchong", "中沖": "zhongchong", "劳宫": "laogong", "大陵": "daling", "间使": "jianshi", "曲泽": "quze", "曲澤": "quze",
  // 三焦经
  "关冲": "guanchong", "液门": "yemen", "中渚": "zhongzhu", "支沟": "zhigou", "天井": "tianjing",
  // 胆经
  "足窍阴": "zuqiaoyin", "足竅陰": "zuqiaoyin", "侠溪": "xiaxi", "俠谿": "xiaxi", "足临泣": "zulinqi", "阳辅": "yangfu", "陽輔": "yangfu", "阳陵泉": "yanglingquan",
  // 肝经
  "大敦": "dadun", "行间": "xingjian", "太冲": "taichong", "中封": "zhongfeng", "曲泉": "ququan"
};

export const ELEMENT_THEMES = {
  "木": { bg: "bg-emerald-50", text: "text-emerald-900", border: "border-emerald-200", icon: "text-emerald-600", light: "bg-emerald-100" },
  "火": { bg: "bg-rose-50", text: "text-rose-900", border: "border-rose-200", icon: "text-rose-600", light: "bg-rose-100" },
  "土": { bg: "bg-amber-50", text: "text-amber-900", border: "border-amber-200", icon: "text-amber-600", light: "bg-amber-100" },
  "金": { bg: "bg-slate-50", text: "text-slate-900", border: "border-slate-300", icon: "text-slate-600", light: "bg-slate-200" },
  "水": { bg: "bg-blue-50", text: "text-blue-900", border: "border-blue-200", icon: "text-blue-600", light: "bg-blue-100" },
  "相火": { bg: "bg-orange-50", text: "text-orange-900", border: "border-orange-200", icon: "text-orange-600", light: "bg-orange-100" }
};

export const MERIDIAN_DATA = [
  {
    name: "手太阴肺经",
    shortName: "肺经",
    element: "金",
    cases: {
      supplement: {
        title: "虚证 (正格)",
        sections: [
          { type: "补其母", points: ["太白 (脾经·土·俞穴)", "太渊 (肺经·土·俞穴)"] },
          { type: "泻其官", points: ["少府 (心经·火·荥穴)", "鱼际 (肺经·火·荥穴)"] }
        ]
      },
      drain: {
        title: "实证 (胜格)",
        sections: [
          { type: "补其官", points: ["少府 (心经·火·荥穴)", "鱼际 (肺经·火·荥穴)"] },
          { type: "泻其子", points: ["阴谷 (肾经·水·合穴)", "尺泽 (肺经·水·合穴)"] }
        ]
      }
    }
  },
  {
    name: "手阳明大肠经",
    shortName: "大肠经",
    element: "金",
    cases: {
      supplement: {
        title: "虚证 (正格)",
        sections: [
          { type: "补其母", points: ["足三里 (胃经·土·合穴)", "曲池 (大肠经·土·合穴)"] },
          { type: "泻其官", points: ["阳谷 (小肠经·火·经穴)", "阳溪 (大肠经·火·经穴)"] }
        ]
      },
      drain: {
        title: "实证 (胜格)",
        sections: [
          { type: "补其官", points: ["阳谷 (小肠经·火·经穴)", "阳溪 (大肠经·火·经穴)"] },
          { type: "泻其子", points: ["足通谷 (膀胱经·水·荥穴)", "二间 (大肠经·水·荥穴)"] }
        ]
      }
    }
  },
  {
    name: "足阳明胃经",
    shortName: "胃经",
    element: "土",
    cases: {
      supplement: {
        title: "虚证 (正格)",
        sections: [
          { type: "补其母", points: ["阳谷 (小肠经·火·经穴)", "解溪 (胃经·火·经穴)"] },
          { type: "泻其官", points: ["足临泣 (胆经·木·俞穴)", "陷谷 (胃经·木·俞穴)"] }
        ]
      },
      drain: {
        title: "实证 (胜格)",
        sections: [
          { type: "补其官", points: ["足临泣 (胆经·木·俞穴)", "陷谷 (胃经·木·俞穴)"] },
          { type: "泻其子", points: ["商阳 (大肠经·金·井穴)", "厉兑 (胃经·金·井穴)"] }
        ]
      }
    }
  },
  {
    name: "足太阴脾经",
    shortName: "脾经",
    element: "土",
    cases: {
      supplement: {
        title: "虚证 (正格)",
        sections: [
          { type: "补其母", points: ["少府 (心经·火·荥穴)", "大都 (脾经·火·荥穴)"] },
          { type: "泻其官", points: ["大敦 (肝经·木·井穴)", "隐白 (脾经·木·井穴)"] }
        ]
      },
      drain: {
        title: "实证 (胜格)",
        sections: [
          { type: "补其官", points: ["大敦 (肝经·木·井穴)", "隐白 (脾经·木·井穴)"] },
          { type: "泻其子", points: ["经渠 (肺经·金·经穴)", "商丘 (脾经·金·经穴)"] }
        ]
      }
    }
  },
  {
    name: "手少阴心经",
    shortName: "心经",
    element: "火",
    cases: {
      supplement: {
        title: "虚证 (正格)",
        sections: [
          { type: "补其母", points: ["大敦 (肝经·木·井穴)", "少冲 (心经·木·井穴)"] },
          { type: "泻其官", points: ["阴谷 (肾经·水·合穴)", "少海 (心经·水·合穴)"] }
        ]
      },
      drain: {
        title: "实证 (胜格)",
        sections: [
          { type: "补其官", points: ["阴谷 (肾经·水·合穴)", "少海 (心经·水·合穴)"] },
          { type: "泻其子", points: ["太白 (脾经·土·俞穴)", "神门 (心经·土·俞穴)"] }
        ]
      }
    }
  },
  {
    name: "手太阳小肠经",
    shortName: "小肠经",
    element: "火",
    cases: {
      supplement: {
        title: "虚证 (正格)",
        sections: [
          { type: "补其母", points: ["足临泣 (胆经·木·俞穴)", "后溪 (小肠经·木·俞穴)"] },
          { type: "泻其官", points: ["足通谷 (膀胱经·水·荥穴)", "前谷 (小肠经·水·荥穴)"] }
        ]
      },
      drain: {
        title: "实证 (胜格)",
        sections: [
          { type: "补其官", points: ["足通谷 (膀胱经·水·荥穴)", "前谷 (小肠经·水·荥穴)"] },
          { type: "泻其子", points: ["足三里 (胃经·土·合穴)", "小海 (小肠经·土·合穴)"] }
        ]
      }
    }
  },
  {
    name: "足太阳膀胱经",
    shortName: "膀胱经",
    element: "水",
    cases: {
      supplement: {
        title: "虚证 (正格)",
        sections: [
          { type: "补其母", points: ["商阳 (大肠经·金·井穴)", "至阴 (膀胱经·金·井穴)"] },
          { type: "泻其官", points: ["足三里 (胃经·土·合穴)", "委中 (膀胱经·土·合穴)"] }
        ]
      },
      drain: {
        title: "实证 (胜格)",
        sections: [
          { type: "补其官", points: ["足三里 (胃经·土·合穴)", "委中 (膀胱经·土·合穴)"] },
          { type: "泻其子", points: ["足临泣 (胆经·木·俞穴)", "束骨 (膀胱经·木·俞穴)"] }
        ]
      }
    }
  },
  {
    name: "足少阴肾经",
    shortName: "肾经",
    element: "水",
    cases: {
      supplement: {
        title: "虚证 (正格)",
        sections: [
          { type: "补其母", points: ["经渠 (肺经·金·经穴)", "复溜 (肾经·金·经穴)"] },
          { type: "泻其官", points: ["太白 (脾经·土·俞穴)", "太溪 (肾经·土·俞穴)"] }
        ]
      },
      drain: {
        title: "实证 (胜格)",
        sections: [
          { type: "补其官", points: ["太白 (脾经·土·俞穴)", "太溪 (肾经·土·俞穴)"] },
          { type: "泻其子", points: ["大敦 (肝经·木·井穴)", "涌泉 (肾经·木·井穴)"] }
        ]
      }
    }
  },
  {
    name: "手厥阴心包经",
    shortName: "心包经",
    element: "相火",
    cases: {
      supplement: {
        title: "虚证 (正格)",
        sections: [
          { type: "补其母", points: ["大敦 (肝经·木·井穴)", "中冲 (心包经·木·井穴)"] },
          { type: "泻其官", points: ["阴谷 (肾经·水·合穴)", "曲澤 (心包经·水·合穴)"] }
        ]
      },
      drain: {
        title: "实证 (胜格)",
        sections: [
          { type: "补其官", points: ["阴谷 (肾经·水·合穴)", "曲澤 (心包经·水·合穴)"] },
          { type: "泻其子", points: ["太白 (脾经·土·俞穴)", "大陵 (心包经·土·俞穴)"] }
        ]
      }
    }
  },
  {
    name: "手少阳三焦经",
    shortName: "三焦经",
    element: "相火",
    cases: {
      supplement: {
        title: "虚证 (正格)",
        sections: [
          { type: "补其母", points: ["足临泣 (胆经·木·俞穴)", "中渚 (三焦经·木·俞穴)"] },
          { type: "泻其官", points: ["足通谷 (膀胱经·水·荥穴)", "液门 (三焦经·水·荥穴)"] }
        ]
      },
      drain: {
        title: "实证 (胜格)",
        sections: [
          { type: "补其官", points: ["足通谷 (膀胱经·水·荥穴)", "液门 (三焦经·水·荥穴)"] },
          { type: "泻其子", points: ["足三里 (胃经·土·合穴)", "天井 (三焦经·土·合穴)"] }
        ]
      }
    }
  },
  {
    name: "足少阳胆经",
    shortName: "胆经",
    element: "木",
    cases: {
      supplement: {
        title: "虚证 (正格)",
        sections: [
          { type: "补其母", points: ["足通谷 (膀胱经·水·荥穴)", "侠溪 (胆经·水·荥穴)"] },
          { type: "泻其官", points: ["商阳 (大肠经·金·井穴)", "足窍阴 (胆经·金·井穴)"] }
        ]
      },
      drain: {
        title: "实证 (胜格)",
        sections: [
          { type: "补其官", points: ["商阳 (大肠经·金·井穴)", "足窍阴 (胆经·金·井穴)"] },
          { type: "泻其子", points: ["阳谷 (小肠经·火·经穴)", "阳辅 (胆经·火·经穴)"] }
        ]
      }
    }
  },
  {
    name: "足厥阴肝经",
    shortName: "肝经",
    element: "木",
    cases: {
      supplement: {
        title: "虚证 (正格)",
        sections: [
          { type: "补其母", points: ["阴谷 (肾经·水·合穴)", "曲泉 (肝经·水·合穴)"] },
          { type: "泻其官", points: ["经渠 (肺经·金·经穴)", "中封 (肝经·金·经穴)"] }
        ]
      },
      drain: {
        title: "实证 (胜格)",
        sections: [
          { type: "补其官", points: ["经渠 (肺经·金·经穴)", "中封 (肝经·金·经穴)"] },
          { type: "泻其子", points: ["少府 (心经·火·荥穴)", "行间 (肝经·火·荥穴)"] }
        ]
      }
    }
  }
];
