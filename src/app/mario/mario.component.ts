import { Component } from '@angular/core';

@Component({
  selector: 'app-mario',
  templateUrl: './mario.component.html',
  styleUrls: ['./mario.component.css']
})
export class MarioComponent {
  randomMario: string = 'https://source.unsplash.com/random/300x300?Mario';

  userName: string = 'Mario';
  userAge: number = 25;
  userFavNumber: number = Math.ceil(Math.random() * 100 );

  resetUserName(): void {
    this.userName = '';
  }

  agePlusTen(): number {
    return this.userAge + 10;
  }
}
