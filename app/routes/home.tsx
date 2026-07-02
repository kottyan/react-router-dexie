import React from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../utils/db';

export default function Home() {
  // 英語の型定義（CareFacilityDataなど）が内部で適用された状態で取得できます
  const file1Items = useLiveQuery(() => db.file1.limit(10).toArray());
  const file1Count = useLiveQuery(() => db.file1.count());

  if (file1Items === undefined || file1Count === undefined) {
    return <div style={{ padding: '20px' }}>データベースを読み込み中...</div>;
  }

  return (
    <div style={{ padding: '20px' }}>
      <h1>e-Stat テストダッシュボード</h1>
      <p>現在の総データ件数: <strong>{file1Count} 件</strong></p>

      <h2>file1 データのサンプル（先頭10件）</h2>
      <table border={1} cellPadding={8} style={{ borderCollapse: 'collapse', width: '100%' }}>
        <thead>
          <tr style={{ backgroundColor: '#f2f2f2' }}>
            <th>管理番号</th>
            <th>都道府県</th>
            <th>施設名</th>
            <th>サービス種別</th>
          </tr>
        </thead>
        <tbody>
          {file1Items.map((item) => (
            // item.管理番号 などの補完が正しく効きます
            <tr key={item.管理番号}>
              <td>{item.管理番号}</td>
              <td>{item.都道府県}</td>
              <td>{item.施設名}</td>
              <td>{item.サービス種別}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}