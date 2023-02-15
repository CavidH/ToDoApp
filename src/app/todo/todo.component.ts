import {Component} from '@angular/core';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent {
  content: string = "";
  key: string = 'ToDoApp';

  getTodos(): ToDo[] {
    return this.getData();
  }

  private getData(): ToDo[] {
    console.log("getData runn")
    let data: string = this.getStorage(this.key);
    let toDoData: ToDo[];
    if (data != null) {
      toDoData = this.serialize(data);

    } else {
      toDoData = []
    }
    return toDoData;
  }

  addTodo() {

    if (this.checkInput())
      return;
    let todo: ToDo = new ToDo(this.content);
    this.content = "";
    let toDoData: ToDo[] = this.getData();
    toDoData.push(todo);
    let deSerializedData: string = this.deserialize(toDoData);
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
    let sData;
    try {
        sData =  JSON.parse(data);

    }
    catch(e){
     }

    if (sData == undefined) {
      this.setStorage(this.key, "[]");
    }
    return  JSON.parse(data);
  }


  private checkInput(): boolean {
    return this.content == "";
  }

  removeToDo(id: string) {
    // debugger;
    let data: ToDo[] = this.getData();
    let toDo: ToDo = data.filter(p => p.id == id)[0];
    let deSerializedData: string = this.deserialize(this.removeElementFromArray(toDo, data));
    this.setStorage(this.key, deSerializedData);


  }

  removeElementFromArray(element: ToDo, arr: ToDo[]) {
    arr.forEach((value, index) => {
      if (value == element) arr.splice(index, 1);
      return arr;
    });
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



