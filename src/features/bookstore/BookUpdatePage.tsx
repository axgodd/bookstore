import {Box, Button, Modal, TextField, Typography} from "@mui/material";
import React, {useEffect, useState} from "react";
import {Book, deleteBook, editBook} from "./bookSlice";
import {useDispatch} from "react-redux";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export const BookUpdatePage: React.FC<{
    isUpdateBook: boolean,
    setIsUpdateBook: React.Dispatch<React.SetStateAction<boolean>>,
    newBook: Book
}> = ({isUpdateBook, setIsUpdateBook, newBook}) => {
    const dispatch = useDispatch();
    const [data, setData] = useState<Book>(newBook);

    useEffect(() => {
        if (newBook) {
            setData(newBook);
        }
    }, [newBook]);
    const handleClose = () => setIsUpdateBook(false);
    const onChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {value, name} = e.target
        setData((prevData) => ({
            ...prevData,
            [name]: value
        }))
    };

    return <>
        <Modal
            open={isUpdateBook}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Update book
                </Typography>
                <form onSubmit={(e) => {
                    e.preventDefault()
                    dispatch(editBook(data))
                    setIsUpdateBook(false)
                }}>
                    <Box sx={{'& > :not(style)': {mb: 2}}}>
                        <div>
                            <TextField
                                required
                                id="outlined-required"
                                label="bookName"
                                name="name"
                                value={data.name}
                                onChange={onChangeValue}
                                sx={{width: '100%', mb: 2}}
                            />
                            <TextField
                                required
                                id="outlined-required"
                                label="price"
                                type="number"
                                name="price"
                                value={data.price}
                                onChange={onChangeValue}
                                sx={{width: '100%', mb: 2}}
                            />
                            <TextField
                                required
                                id="outlined-required"
                                label="category"
                                name="category"
                                value={data.category}
                                onChange={onChangeValue}
                                sx={{width: '100%', mb: 2}}
                            />
                            <TextField
                                required
                                id="outlined-required"
                                label="description"
                                name="description"
                                value={data.description}
                                onChange={onChangeValue}
                                sx={{width: '100%', mb: 2}}
                            />
                        </div>
                        <Button
                            variant="contained"
                            type="submit"
                        >
                            Save
                        </Button>
                    </Box>
                </form>
            </Box>
        </Modal>
    </>
}