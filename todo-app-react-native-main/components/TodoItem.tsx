import React, { FC } from 'react'
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native'
import { TodoItemModel } from '../models/TodoItemModel'
import { Feather } from '@expo/vector-icons'

interface ITodoItem {
	data: TodoItemModel
	toggleCompletion: () => void
	removeItem: () => void
	onChangeText: (text: string) => void
}

const TodoItem: FC<ITodoItem> = ({
	data,
	toggleCompletion,
	removeItem,
	onChangeText,
}) => {
	const onBlur = () => {
		!data.body && removeItem()
	}
	return (
		<View style={styles.item}>
			<TouchableOpacity onPress={toggleCompletion}>
				{data.isCompleted ? (
					<Feather name='check-square' size={32} color='#ee6c4d' style={{}} />
				) : (
					<Feather name='square' size={32} color='black' style={{}} />
				)}
			</TouchableOpacity>
			<TextInput
				placeholder='Задача...'
				multiline={true}
				style={{
					fontSize: 24,
					paddingHorizontal: 10,
					color: data.isCompleted ? '#ee6c4d' : 'black',
					textDecorationLine: data.isCompleted ? 'line-through' : 'none',
				}}
				onChangeText={onChangeText}
				onBlur={onBlur}
				defaultValue={data.body}
			/>
		</View>
	)
}

export default TodoItem

const styles = StyleSheet.create({
	item: {
		flex: 1,
		maxWidth: '90%',
		flexDirection: 'row',
		alignItems: 'center',
		paddingBottom: 20,
	},
})
