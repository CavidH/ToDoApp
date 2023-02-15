import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ToDoApp';

  getTodos(): ToDo[] {
    return [{
      id: 1,
      content: "sdsd",
      status: true,
    },{
      id: 1,
      content: "sdsd",
      status: true,
    },{
      id: 1,
      content: "sdsd",
      status: true,
    },{
      id: 1,
      content: "sdsd",
      status: true,
    }]
  }
}

class ToDo {
  id: number;
  content: string;
  status: boolean;
}
