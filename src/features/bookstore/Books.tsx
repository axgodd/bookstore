import React, {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {addBook, BookState, deleteBook} from './bookSlice'
import {RootState} from "../../app/store";
import {Box, Button, ButtonBase, Grid, Modal, Paper, styled, TextField, Typography} from "@mui/material";
import {BookUpdatePage} from "./BookUpdatePage";

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
const BookList = () => {
    const books = useSelector((state: RootState) => state.books.books);
    const dispatch = useDispatch();
    const [isModalOpen, setModalOpen] = useState(false);
    const [newBook, setNewBook] = useState({id: 0, name: '', price: 0, category: '', description: ''});
    const [isUpdateBook, setIsUpdateBook] = useState(false);
    const [selectedBook, setSelectedBook] = useState(0);

    const handleAddBook = () => {
        dispatch(addBook({...newBook, id: Date.now()}))
        setModalOpen(false)
        setNewBook({id: 0, name: '', price: 0, category: '', description: ''})
    };
    const handleClose = () => setModalOpen(false);
    const onChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {value, name} = e.target
        setNewBook({...newBook, [name]: value})
    };

    return (
        <div>
            <Paper sx={{
                p: 2,
                margin: '5px auto',
                maxWidth: 500,
                flexGrow: 1,
            }}>
                <Typography
                    variant="h3"
                    component="h2"
                    sx={{textAlign: 'center'}}
                >
                    Bookstore
                </Typography>
                <Button onClick={() => setModalOpen(true)} variant="contained">
                    Add Book
                </Button>
                {books && books.map((book, index) => (
                    <div key={book.id}>
                        <Grid container spacing={2} alignItems="center">
                            <Grid item xs={9}>
                                <Paper
                                    sx={{
                                        p: 2,
                                        margin: '5px auto',
                                        maxWidth: 500,
                                        flexGrow: 1,
                                        backgroundColor: 'lightBlue',
                                        cursor: 'pointer'
                                    }}
                                    onClick={() => {
                                        setIsUpdateBook(true)
                                        setSelectedBook(index)
                                    }}
                                >
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} sm container>
                                            <Grid item xs container direction="column" spacing={2}>
                                                <Grid item xs>
                                                    <Typography gutterBottom variant="subtitle1" component="div">
                                                        Name: {book.name}
                                                    </Typography>
                                                    <Typography variant="body2" style={{wordWrap: "break-word"}}
                                                                gutterBottom>
                                                        Category: {book.category}
                                                    </Typography>
                                                    <Typography variant="body2" style={{wordWrap: "break-word"}}
                                                                color="text.secondary">
                                                        Description: {book.description}
                                                    </Typography>
                                                </Grid>
                                                <Grid item>
                                                    <Typography variant="subtitle1" component="div">
                                                        Price: ${book.price}
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Paper>
                            </Grid>
                            <Grid item xs={3} container alignItems="center">
                                <Button
                                    onClick={() => dispatch(deleteBook(book.id))} variant="outlined"
                                >
                                    Delete
                                </Button>
                            </Grid>
                        </Grid>
                    </div>
                ))}

                <Modal
                    open={isModalOpen}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            Add book
                        </Typography>
                        <form onSubmit={(e) => {
                            e.preventDefault();
                            handleAddBook();
                        }}>
                            <Box sx={{'& > :not(style)': {mb: 2}}}>
                                <div>
                                    <TextField
                                        required
                                        id="outlined-required"
                                        label="bookName"
                                        placeholder="Add name"
                                        name="name"
                                        value={newBook.name}
                                        onChange={onChangeValue}
                                        sx={{width: '100%', mb: 2}}
                                    />
                                    <TextField
                                        required
                                        id="outlined-required"
                                        label="price"
                                        type="number"
                                        name="price"
                                        value={newBook.price}
                                        placeholder="Add price"
                                        onChange={onChangeValue}
                                        sx={{width: '100%', mb: 2}}
                                    />
                                    <TextField
                                        required
                                        id="outlined-required"
                                        label="category"
                                        placeholder="Add category"
                                        name="category"
                                        value={newBook.category}
                                        onChange={onChangeValue}
                                        sx={{width: '100%', mb: 2}}
                                    />
                                    <TextField
                                        required
                                        id="outlined-required"
                                        label="description"
                                        placeholder="Add description"
                                        name="description"
                                        value={newBook.description}
                                        onChange={onChangeValue}
                                        sx={{width: '100%', mb: 2}}
                                    />
                                </div>
                                <Button variant="contained" type="submit">Save</Button>
                            </Box>
                        </form>
                    </Box>
                </Modal>
                <BookUpdatePage
                    isUpdateBook={isUpdateBook}
                    setIsUpdateBook={setIsUpdateBook}
                    newBook={books[selectedBook]}
                />
            </Paper>
        </div>
    )
}
export default BookList