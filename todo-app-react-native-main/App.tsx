import { useEffect, useState } from 'react'
import {
	FlatList,
	StatusBar,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native'
import TodoItem from './components/TodoItem'
import { TodoItemModel } from './models/TodoItemModel'
import { AntDesign } from '@expo/vector-icons'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function App() {
	const [todos, setTodos] = useState<TodoItemModel[]>([])

	useEffect(() => {
		const getSavedTodos = async () => {
			await AsyncStorage.getItem('todos').then(data =>
				data ? setTodos(JSON.parse(data)) : setTodos([])
			)
		}
		getSavedTodos()
	}, [])

	const createNewTodoItem = () => {
		setTodos((prevState: TodoItemModel[]) => [
			...prevState,
			{
				id: prevState.length ? prevState.length : 0,
				body: '',
				isCompleted: false,
			} as TodoItemModel,
		])
	}

	const toggleCompletion = async (id: number) => {
		const updatedTodoList = todos.map((item: TodoItemModel) =>
			item.id === id && item.body
				? { ...item, isCompleted: !item.isCompleted }
				: item
		)
		setTodos(updatedTodoList)
		await AsyncStorage.setItem('todos', JSON.stringify(updatedTodoList))
	}

	const removeItem = async (id: number) => {
		setTodos(todos.filter((item: TodoItemModel) => item.id !== id))
		await AsyncStorage.setItem('todos', JSON.stringify(todos))
	}

	const changeText = async (id: number, text: string) => {
		const updatedTodoList = todos.map((item: TodoItemModel) =>
			item.id === id ? { ...item, body: text } : item
		)
		setTodos(updatedTodoList)
		await AsyncStorage.setItem('todos', JSON.stringify(todos))
	}

	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<Text style={styles.headerText}>Список задач</Text>
			</View>

			<View style={styles.list}>
				<FlatList
					data={todos}
					keyExtractor={(item: TodoItemModel) => item.id.toString()}
					renderItem={({ item }) => (
						<TodoItem
							data={item}
							toggleCompletion={() => toggleCompletion(item.id)}
							removeItem={() => removeItem(item.id)}
							onChangeText={text => changeText(item.id, text)}
						/>
					)}
				/>
				<TouchableOpacity
					activeOpacity={0.8}
					style={styles.button}
					onPress={createNewTodoItem}
				>
					<AntDesign name='plus' size={24} color='white' />
				</TouchableOpacity>
			</View>

			<StatusBar barStyle={'light-content'} backgroundColor={'#293241'} />
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#293241',
	},
	header: {
		flex: 1,
		justifyContent: 'flex-end',
		padding: 25,
		paddingVertical: 5,
	},
	headerText: {
		fontSize: 42,
		fontWeight: '700',
		color: '#e0fbfc',
	},
	list: {
		flex: 3,
		backgroundColor: '#e0fbfc',
		borderTopLeftRadius: 30,
		borderTopRightRadius: 30,
		padding: 20,
	},
	button: {
		backgroundColor: '#ee6c4d',
		position: 'absolute',
		bottom: 25,
		right: 25,
		padding: 20,
		borderRadius: 50,
		elevation: 12,
	},
})
