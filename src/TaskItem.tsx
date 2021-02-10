import React,{useState} from 'react'
import firebase from 'firebase/app'
import styles from './TaskItem.module.css' 
import {ListItem, TextField, Grid,Button} from '@material-ui/core';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined'
import EditOutlinedIcon from '@material-ui/icons/EditOutlined'
import {db} from "./firebase"

interface PROPS {
    id: string;
    title: string;
}

const TaskItem:React.FC<PROPS> = (props) => {
    const [title, setTitle] = useState(props.title)

    const editTask =()=>{
        db.collection("tasks").doc(props.id).set({title: title}, {merge: true})
    }

    const deleteTask =()=>{
        db.collection("tasks").doc(props.id).delete();
    }

    return (

            <ListItem>
                <h2>{props.title}</h2>
                <Grid container justify="flex-end">
                    <TextField 
                        InputLabelProps={{//labelを左上に小さく表示
                            shrink: true,
                        }} 
                        label="編集"
                        value={title}
                        onChange={(e:React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
                    />
                </Grid>
                <Button onClick={editTask}>
                    <EditOutlinedIcon />
                </Button>
                <Button onClick={deleteTask}>
                    <DeleteOutlineOutlinedIcon />
                </Button>
            </ListItem>

    )
}

export default TaskItem
