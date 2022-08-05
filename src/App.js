import { useEffect, useState } from "react"
import "./App.css"

function App() {
	const [posts, setPosts] = useState([])

	useEffect(() => {
		//$ GET
		async function fetchData() {
			const response = await fetch(
				"https://jsonplaceholder.typicode.com/posts?_limit=8"
			)
			const result = await response.json()
			setPosts(result)
		}
		fetchData()
	}, [])
	//$ DELETE
	const deleteTodo = async (id) => {
		const response = await fetch(
			`https://jsonplaceholder.typicode.com/posts/${id}`,
			{
				method: "DELETE",
			}
		)
		if (response.ok) {
			setPosts((posts) => posts.filter((post) => post.id !== id))
			console.log("DELETE OKAY", response)
		}
	}
	//$ POST
	const addTodo = async (title) => {
		const response = await fetch(`https://jsonplaceholder.typicode.com/posts`, {
			method: "POST",
			body: JSON.stringify({
				title: title,
			}),
			headers: {
				"Content-type": "application/json; charset=UTF-8",
			},
		})
		const result = await response.json()
		if (response.ok) {
			setPosts((posts) => [result, ...posts])
			console.log("TODO", result)
			console.log(posts)
			console.log("POST OKAY", response)
		}
	}
	//$ PUT
	const changeTodo = async (id) => {
		const response = await fetch(
			`https://jsonplaceholder.typicode.com/posts/${id}`,
			{
				method: "PUT",
				body: JSON.stringify({
					userID: 228,
					title: "Put request!",
					body: "PUT REQUEST 321321321322132132213213423423423423423rejrewjfjeawjfeawoaewfjeao",
				}),
				headers: {
					"Content-type": "application/json; charset=UTF-8",
				},
			}
		)
		const result = await response.json()
		if (response.ok) {
			const item = posts.find((todo) => todo.id === result.id)
			const index = posts.indexOf(item)
			posts.splice(index, 1, result)
			setPosts((posts) => [...posts])
			console.log("TODO", result)
			console.log("PUT OKAY", response)
		}
	}
	// $ PATCH
	const patchTodo = async (id) => {
		const response = await fetch(
			`https://jsonplaceholder.typicode.com/posts/${id}`,
			{
				method: "PATCH",
				body: JSON.stringify({
					title: "Patched!",
				}),
				headers: {
					"Content-type": "application/json; charset=UTF-8",
				},
			}
		)
		const result = await response.json()
		if (response.ok) {
			const item = posts.find((todo) => todo.id === result.id)
			const index = posts.indexOf(item)
			posts.splice(index, 1, result)
			setPosts((posts) => [...posts])
			console.log("TODO", result)
			console.log("PATCH OKAY", response)
		}
	}

	return (
		<div className='App'>
			<header className='App-header'>
				<h1>ADD TODO</h1>
				<form
					onSubmit={(e) => {
						e.preventDefault()
						addTodo(e.target[0].value)
					}}
					className='input-container'>
					<input type='text' className='input' />
					<button type='submit'>add</button>
				</form>
				{posts &&
					posts.map((post) => (
						<div className='todo' key={post.id}>
							<h2>TITLE</h2>
							<p>{post.title}</p>
							<h2>BODY</h2>
							<p>{post.body}</p>
							<button onClick={() => deleteTodo(post.id)}>x</button>
							<button onClick={() => changeTodo(post.id)}>change</button>
							<button onClick={() => patchTodo(post.id)}>patch</button>
						</div>
					))}
			</header>
		</div>
	)
}

export default App
