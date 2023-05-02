import { Component } from '@angular/core';

@Component({
  selector: 'app-les-amis',
  templateUrl: './les-amis.component.html',
  styleUrls: ['./les-amis.component.css']
})
export class LesAmisComponent {
  amis = [
    { nom: 'Alain Térieur' },
    { nom: 'Jean Bon' },
    { nom: 'Ella Vator' },
    { nom: 'Sarah Croche' },
    { nom: 'Marc Assin' }
  ];
}
