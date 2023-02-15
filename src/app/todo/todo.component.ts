import {Component} from '@angular/core';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent {
  content: string;
  key: string = 'ToDoApp';

  getTodos(): ToDo[] {
    let data: string = this.getStorage(this.key);
    let serializedData: ToDo[];
    if (data != null) {
      serializedData = this.serialize(data);

    } else {
      serializedData = []
    }
    return serializedData;
  }

  addTodo() {


    let todo: ToDo = new ToDo(this.content);
    this.content = "";
    let data: string = this.getStorage(this.key);
    let serializedData: ToDo[];
    if (data != null) {
      serializedData = this.serialize(data);

    } else {
      serializedData = []
    }
    serializedData.push(todo);

    let deSerializedData: string = this.deserialize(serializedData);
    this.setStorage(this.key, deSerializedData);
  }



  private setStorage(key: string, value: string): void {
    localStorage.setItem(key, value);
  }

  private getStorage(key: string): string {
    return localStorage.getItem(key);
  }

  private deserialize(data: any): string {
    return JSON.stringify(data);
  }

  private serialize(data: string): ToDo[] {
    return <ToDo[]>JSON.parse(data);
  }


}

class ToDo {
  id: string;
  content: string;

  constructor(content: string) {
    this.id = crypto.randomUUID();
    this.content = content;
  }
}
