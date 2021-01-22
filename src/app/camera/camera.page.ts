import { Component } from '@angular/core';
import { Plugins, CameraResultType, CameraSource } from '@capacitor/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-camera',
  templateUrl: 'camera.page.html',
  styleUrls: ['camera.page.scss']
})
export class CameraPage {

  imageURL: SafeResourceUrl;

  constructor(
    private sanitier: DomSanitizer
  ) { }

  /**
   * 画像読込
   * @param event 
   */
  public loadImage(event: any) {
    // ファイル取得
    const file = event.target.files[0];
    // ファイルリーダー
    const fileReader = new FileReader();

    // loadイベント
    fileReader.addEventListener("load", () => {
      this.imageURL = fileReader.result;
    }, false);
    // データURLで読込
    fileReader.readAsDataURL(file);
  }

  /**
   * カメラ起動
   */
  async takePicture() {
    const image = await Plugins.Camera.getPhoto({
      quality: 100,
      allowEditing: false,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Camera,
      saveToGallery: true,
    });
   
    this.imageURL = this.sanitier.bypassSecurityTrustResourceUrl(image && (image.dataUrl));
  }
}
