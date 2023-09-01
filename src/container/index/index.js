// const createElement = (tag, className, text) => {
//   const element = document.createElement(tag)

//   if (className) {
//     element.className = className
//   }

//   if (text) {
//     element.innerText = text
//   }

//   return element
// }

// const page = document.querySelector('.page')

// const title = createElement('h1', 'title', 'To-do list')

// page.append(title)

// const form = createElement('div', 'form')

// page.append(form)

// const formField = createElement('input', 'form__input')
// const formButton = createElement(
//   'div',
//   'form__button',
//   'Додати',
// )

// formField.setAttribute('placeholder', 'Введіть задачу...')

// form.append(formField, formButton)

export class Todo {
  static #NAME = 'TODO'

  static #list = []

  static #count = 0

  static #block = null
  static #template = null
  static #input = null
  static #button = null

  static #saveData = () => {
    localStorage.setItem(
      this.#NAME,
      JSON.stringify({
        list: this.#list,
        count: this.#count,
      }),
    )
  }

  static #loadData = () => {
    const data = localStorage.getItem(this.#NAME)

    if (data) {
      const { list, count } = JSON.parse(data)
      this.#list = list
      this.#count = count
    }
  }

  static init = () => {
    this.#template =
      document.querySelector(
        '#task',
      ).content.firstElementChild

    this.#block = document.querySelector('.task__list')

    this.#input = document.querySelector('.form__input')

    this.#button = document.querySelector('.form__button')

    this.#button.onclick = this.#handleAdd

    this.#loadData()

    this.#render()
  }

  static #createTaskData = (text) => {
    return this.#list.push({
      id: ++this.#count,
      text,
      done: false,
    })
  }

  static #handleAdd = () => {
    const text = this.#input.value

    // console.log(text)
    if (text.length >= 1) {
      this.#createTaskData(text)
      this.#input.value = ''
    }
    this.#saveData()
    this.#render()
    console.log(this.#list)
  }

  static #render = () => {
    this.#block.innerHTML = ''

    if (this.#list.length > 0) {
      this.#list.forEach((data) => {
        const listElement = this.#createTaskElement(data)

        this.#block.append(listElement)
      })
    } else {
      this.#block.innerText = 'список пустий'
    }
  }

  static #createTaskElement = (data) => {
    const el = this.#template.cloneNode(true)
    const [id, text, btnDo, btnCancel] = el.children
    // const taskNumber =
    //   listElement.querySelector('.task__number')
    // taskNumber.innerText = id
    // const taskText =
    //   listElement.querySelector('.task__text')
    // taskNumber.innerText = id
    // const buttons =
    //   listElement.getElementsByClassName('task__button')
    // // console.log(buttons)
    // const buttonDone =
    //   listElement.querySelector('.task__button')
    // const buttonCancel = buttons[1]
    // // buttonCancel.setAttribute(
    // //   'onclick',
    //   this.#removeElement(id),
    // )

    id.innerText = `${data.id}.`
    text.innerText = data.text

    btnCancel.onclick = this.#handleCancel(data)

    btnDo.onclick = this.#handleDo(data, btnDo, el)

    if (data.done) {
      el.classList.add('task--done')
      btnDo.classList.remove('task__button--do')
      btnDo.classList.add('task__button--done')
    }

    return el
  }

  static #handleDo = (data, btn, el) => () => {
    const result = this.#toggleDone(data.id)

    if (result === true || result === false) {
      el.classList.toggle('task--done')
      btn.classList.toggle('task__button--do')
      btn.classList.toggle('task__button--done')
    }
    this.#saveData()
  }

  static #toggleDone = (id) => {
    const task = this.#list.find((item) => item.id === id)

    if (task) {
      task.done = !task.done
      this.#saveData()
      return task.done
    } else return null
  }

  static #handleCancel = (data) => () => {
    if (confirm('Видалити задачу')) {
      const result = this.#deleteById(data.id)
      this.#saveData()
      if (result) {
        this.#render()
      }
    }
  }

  static #deleteById = (id) => {
    this.#list = this.#list.filter((obj) => obj.id !== id)
    return true
  }
}

Todo.init()

window.todo = Todo
