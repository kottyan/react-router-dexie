// 1. require ではなく import に書き換え
import fs from 'fs';

const prefs = ['東京都', '大阪府', '神奈川県', '愛知県', '北海道', '福岡県', '埼玉県', '千葉県', '兵庫県', '京都府'];
const careServices = ['訪問介護', '通所介護（デイサービス）', '短期入所生活介護', '居宅介護支援', '特別養護老人ホーム'];
const causes = ['脳血管疾患(脳卒中)', '認知症', '高齢による衰弱', '骨折・転倒', '関節疾患'];
const jobStatus = ['正規の職員・従業員', 'パート・アルバイト', '派遣社員', '自営業', '未就業'];

function generateData(fileIndex) {
  const data = [];
  
  for (let i = 1; i <= 10000; i++) {
    const pref = prefs[Math.floor(Math.random() * prefs.length)];
    
    if (fileIndex === 1) {
      data.push({
        "管理番号": i,
        "調査年": "令和5年",
        "都道府県": pref,
        "施設名": `${pref}ケアサービスセンター第${i}`,
        "サービス種別": careServices[Math.floor(Math.random() * careServices.length)],
        "常勤換算職員数": parseFloat((Math.random() * 20 + 2).toFixed(1)),
        "月間利用者数": Math.floor(Math.random() * 200) + 20
      });
    } else if (fileIndex === 2) {
      data.push({
        "管理番号": i,
        "調査年": "令和3年",
        "世帯区分": Math.random() > 0.1 ? "母子世帯" : "父子世帯",
        "親の年齢階級": `${Math.floor(Math.random() * 4) * 5 + 25}〜${Math.floor(Math.random() * 4) * 5 + 29}歳`,
        "就業状況": jobStatus[Math.floor(Math.random() * jobStatus.length)],
        "末子の年齢": Math.floor(Math.random() * 18),
        "年間就労収入": Math.floor(Math.random() * 400 + 100) * 10000
      });
    } else if (fileIndex === 3) {
      data.push({
        "管理番号": i,
        "調査年": "令和4年",
        "自治体名": `${pref}保健所管内-${i}`,
        "施設種別": "地域保健センター",
        "設置主体": Math.random() > 0.3 ? "地方公共団体" : "民間医療法人",
        "保健師数": Math.floor(Math.random() * 15) + 1,
        "年間相談件数": Math.floor(Math.random() * 3000) + 100
      });
    } else if (fileIndex === 4) {
      data.push({
        "管理番号": i,
        "調査年": "令和5年",
        "都道府県": pref,
        "施設種別": "特別養護老人ホーム",
        "経営主体": "社会福祉法人",
        "定員数": Math.floor(Math.random() * 70) + 30,
        "現在の在所者数": Math.floor(Math.random() * 90) + 10
      });
    } else if (fileIndex === 5) {
      data.push({
        "管理番号": i,
        "調査年": "令和4年",
        "性別": Math.random() > 0.4 ? "女性" : "男性",
        "年齢階級": `${Math.floor(Math.random() * 3) * 5 + 70}〜${Math.floor(Math.random() * 3) * 5 + 74}歳`,
        "要介護度": `要介護${Math.floor(Math.random() * 5) + 1}`,
        "主な原因": causes[Math.floor(Math.random() * causes.length)],
        "同居介護者の有無": Math.random() > 0.3 ? "有" : "無"
      });
    }
  }
  return data;
}

// 5ファイル出力
for (let f = 1; f <= 5; f++) {
  const resultData = generateData(f);
  // fs.writeFileSync をそのまま使用
  fs.writeFileSync(`file${f}.json`, JSON.stringify(resultData, null, 2), 'utf-8');
  console.log(`file${f}.json (1万行) を生成しました。`);
}