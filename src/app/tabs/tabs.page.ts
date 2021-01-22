import { Component } from '@angular/core';
import { BrowserPlugin, Plugins } from '@capacitor/core'

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  // 外部ブラウザを起動
  private browser: BrowserPlugin

  /**
   * コンストラクタ
   */
  constructor() {
    this.browser = Plugins.Browser
  }

  /**
   * 外部ブラウザを起動してサイボウズを起動する
   */
  openCybozu() {
    var cybozuId: string = '';
    var cybozuPassword: string = '';
    var accountInfo: string = '';

    // ストレージに設定情報が保存されていたら取り出す
    if ('setting' in localStorage) {
      var setting = JSON.parse(localStorage.setting);
      cybozuId = setting.id;
      cybozuPassword = setting.password;
      accountInfo = cybozuId + ':' + cybozuPassword + '@';
    }

    this.browser.open({
      url: 'https://' + accountInfo + 'ここにURLを書いてね',
      windowName: '_system'
    });
  }
}
