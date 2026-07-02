import Dexie, { type Table, type Transaction } from 'dexie';

// 1. テストデータのJSONファイルを直接インポート
import file1Data from '../data/file1.json';
import file2Data from '../data/file2.json';
import file3Data from '../data/file3.json';
import file4Data from '../data/file4.json';
import file5Data from '../data/file5.json';

// 2. 英語表記に修正したデータ構造の型定義
export interface CareFacilityData {
  管理番号: number;
  調査年: string;
  都道府県: string;
  施設名: string;
  サービス種別: string;
  常勤換算職員数: number;
  月間利用者数: number;
}

export interface SingleParentHouseholdData {
  管理番号: number;
  調査年: string;
  世帯区分: '母子世帯' | '父子世帯';
  親の年齢階級: string;
  就業状況: string;
  末子の年齢: number;
  年間就労収入: number;
}

// file3, 4, 5 も英語名に統一
export interface RegionalHealthData { 管理番号: number; [key: string]: any; }
export interface SocialWelfareFacilityData { 管理番号: number; [key: string]: any; }
export interface LongTermCareCauseData { 管理番号: number; [key: string]: any; }

// 3. Dexieクラスの定義
class EStatDatabase extends Dexie {
  file1!: Table<CareFacilityData, number>;
  file2!: Table<SingleParentHouseholdData, number>;
  file3!: Table<RegionalHealthData, number>;
  file4!: Table<SocialWelfareFacilityData, number>;
  file5!: Table<LongTermCareCauseData, number>;

  constructor() {
    super('EStatSocialSecurityDB');
    
    // スキーマ定義（IndexedDBに登録するインデックス。JSONのプロパティである日本語名と一致させます）
    this.version(1).stores({
      file1: '管理番号, 都道府県, サービス種別',
      file2: '管理番号, 世帯区分, 就業状況',
      file3: '管理番号, 自治体名',
      file4: '管理番号, 都道府県, 施設種別',
      file5: '管理番号, 要介護度, 主な原因',
    });

    // 4. db.on('populate') を使った初期データ挿入
    this.on('populate', (tx: Transaction) => {
      console.log('--- db.on("populate"): 初期データのインポートを開始します ---');

      return Promise.all([
        tx.table('file1').bulkPut(file1Data),
        tx.table('file2').bulkPut(file2Data),
        tx.table('file3').bulkPut(file3Data),
        tx.table('file4').bulkPut(file4Data),
        tx.table('file5').bulkPut(file5Data),
      ])
      .then(() => {
        console.log('--- db.on("populate"): すべての初期データが正常に挿入されました ---');
      })
      .catch((error) => {
        console.error('初期データのインポートに失敗しました。DBの作成がロールバックされます:', error);
        throw error; 
      });
    });

    // 1. 同期的に既存の接続をすべて切断し、古いDBを削除
  // ※トップレベルでのawaitが使えない環境を考慮し、即時実行関数(IIFE)で安全に同期制御します
  (async () => {
    try {
      await Dexie.delete('EStatSocialSecurityDB');
      console.log('✅ 古いデータベースの削除が完了しました。');
    } catch (err) {
      console.error('データベースの削除に失敗しました:', err);
    }
  })();
  }
}

export const db = new EStatDatabase();