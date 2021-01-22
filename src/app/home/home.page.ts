import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage {

  private apiURL: string = 'https://public-api.wordpress.com/rest/v1.1/sites/ionicjp.wordpress.com/posts/';

  // 表示データ
  posts: {
    ID: number;
    title: string;
    content: string;
    date: string;
  }[] = [];

  /**
   * コンストラクタ
   */
  constructor(
    public http: HttpClient,
    public loadingController: LoadingController, // ローディングインジケータ
  ) { }

  /**
   * 表示データを取得
   */
  async getPosts() {
    // 表示データを初期化
    this.posts = [];

    // ローディングインジケータを生成
    const loading = await this.loadingController.create({
      message: '読込中...',
    });
    // ローディングインジケータを表示
    await loading.present();

    // APIを実行
    this.http.get(this.apiURL)
      .subscribe(data => {
        this.posts = data['posts'].concat(data['posts']).concat(data['posts']).concat(data['posts']).concat(data['posts']);
        console.log(data)
      });

    // ローディングインジケータを終了
    loading.dismiss();
  }
}
