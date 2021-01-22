import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.page.html',
  styleUrls: ['./setting.page.scss'],
})
export class SettingPage implements OnInit {

  // 設定
  setting: {
    id: string;
    password: string;
  } = {
      id: '',
      password: ''
    };

  // サイボウズのID
  cybozuId: string = '';
  // サイボウズのパスワード
  cybozuPassword: string = '';

  /**
   * コンストラクタ
   */
  constructor(
    public alertController: AlertController,
  ) { }

  /**
   * ページを生成したときに一度だけ実行
   */
  ngOnInit() {
  }

  /**
   * ページ読み込み時に実行
   */
  ionViewWillEnter() {
    // ストレージに保存されていたら取り出す
    if ('setting' in localStorage) {
      this.setting = JSON.parse(localStorage.setting);
      this.cybozuId = this.setting.id;
      this.cybozuPassword = this.setting.password;
    }
  }

  /**
   * 保存
   */
  async save() {
    // 設定を保存
    this.setting.id = this.cybozuId;
    this.setting.password = this.cybozuPassword;
    localStorage.setting = JSON.stringify(this.setting);

    // アラート表示
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      //header: 'Alert',
      //subHeader: 'Subtitle',
      message: '保存が完了しました。',
      buttons: ['OK']
    });
    await alert.present();
  }
}
