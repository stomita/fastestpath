# FastestPath

最短経路でSalesforceにアクセスするモバイルアプリ

<iframe width="853" height="480" src="//www.youtube.com/embed/Jr-8zWQaBHM?rel=0" frameborder="0" allowfullscreen></iframe>

## 概要

FastestPathは、Salesforce内の情報へ秒速でアクセスを可能にするモバイルアプリです。

あらかじめ選んでおいた複数のリストを切り替えて、探している情報にスムーズにアクセスできます。

リスト中のレコードをタップすると、Salesforce1画面が立ち上がり、直接レコードの詳細を表示します。


## 利用方法

iOSアプリのビルドは、XCodeを使ってビルドします。
`./cordova/platforms/ios/FastestPath.xcworkspace` を開いて、FastestPathプロジェクトのビルドを実行します。
(アプリを実機で利用するには Apple Developer Program に登録している必要があります。)

また、ハイブリッドアプリのビルドのために、[Sencha Command](http://www.sencha.com/products/sencha-cmd/download)をインストールする必要があります。
以下のコマンドを利用してネイティブパッケージ化します。

```
$ sencha app build native
```

現在ベータ版のため、Apple Storeでは未公開です。
TestFlightの利用をご希望の方は、Authorに直接コンタクトして下さい

一応Heroku上にデプロイしたWeb版もあります。OAuthでのログインが必要です。

iOS Safari / Android Chrome からアクセス:

- https://fastestpath-for-salesforce.herokuapp.com/

PCWebブラウザ上で利用できるシミュレータ:

- https://fastestpath-for-salesforce.herokuapp.com/simulator.html


## アーキテクチャ

Sencha Touch を使ったハイブリッドアプリ(Apache Cordovaを利用）です。　

また、SalesforceへのAPI認可の取得に際し、Salesforce Mobile SDK for Hybrid を利用し、iOSアプリでトークンを管理しています。

ハイブリッドアプリ内からのAPI呼び出しは[JSforce](http://jsforce.githubu.io/)を利用しています。

(なお、Androidへの対応は未定です)


## 利用しているAPI

- Salesforce Analytics API (レポートの実行結果の取得)
- Salesforce REST API (最近アクセスしたレコード情報の取得)


## ライセンス
[GNU Public License v3](http://www.gnu.org/copyleft/gpl.html)

