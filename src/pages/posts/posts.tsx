import Helmet from '@/components/shared/helmet';
import Table, { Row, Cell } from '@/components/library/table';
import LoadingTable from '@/components/shared/loading-table';
import Button from '@/components/library/button';
import Modal from '@/components/library/modal';
import Accord, { AccordionSection } from '@/components/library/accordion';
import { FormInput, Form, ErrorText } from '@/components/form';
import { ReactComponent as PencilIcon } from '@/assets/icons/pencil.svg';
import { Container } from '@/styled/shared';
import { Flex } from '@/styled/flex';
import { H2, H4, H5, H6 } from '@/styled/typography';
import { useTranslation, useFormModes, useGQuery, useMutation, useToast, useModal } from '@/hooks';
import { GET_POSTS_ARGS } from '@/services/graphql/posts/query';
import { ADD_POST_ARGS, IAddPostArgs, UPDATE_POST_ARGS } from '@/services/graphql/posts/mutation';
import { IPost } from '@/types/models/post';

const Posts = () => {
	const { t } = useTranslation();
	const { toast } = useToast();
	const { state, setItem, handleOpen, handleClose } = useFormModes();
	const { isOpen, closeModal, openModal, item: selected } = useModal<IPost>();
	const isEditMode = state.mode === 'edit';
	const defaultValues = isEditMode ? { title: state.selectedItem.title, body: state.selectedItem.body } : {};
	const { data, loading, refetch, variables } = useGQuery(...GET_POSTS_ARGS);
	const [addPost, { loading: addLoading, error }] = useMutation(...ADD_POST_ARGS);
	const [updatePost, { loading: updateLoading }] = useMutation(...UPDATE_POST_ARGS);

	const handlePrev = (prev: typeof data['posts']['links']['prev']) => {
		refetch({ options: { ...variables?.options, paginate: prev } });
	};

	const handleNext = (next: typeof data['posts']['links']['next']) => {
		refetch({ options: { ...variables?.options, paginate: next } });
	};

	const onSubmit = async (values: IAddPostArgs['input']) => {
		if (isEditMode) {
			await updatePost({ variables: { input: { body: values.body }, id: state.selectedItem.id } });
			toast.success('Post has been edited');
		} else {
			await addPost({ variables: { input: values } });
			toast.success('Post has been added');
		}
		handleClose();
	};

	return (
		<>
			<Helmet title={t('Rick and Morty')} />

			<Container height="100%">
				<Flex direction="column">
					<Flex padding="20px 10px" justify="flex-end">
						<Button inline buttonType="text" text="Add" onClick={handleOpen} />
					</Flex>

					{loading ? (
						<LoadingTable padding="10px 0" loading={loading} />
					) : (
						<Table
							data={data.posts.data}
							showHeader={false}
							overflow="auto"
							renderBody={item => (
								<Row key={item.id}>
									<Cell onClick={() => openModal(item)}>{item.id}</Cell>
									<Cell onClick={() => openModal(item)}>{item.title}</Cell>
									<Cell onClick={() => openModal(item)}>{item.user.name}</Cell>
									<Cell width="60px">
										<PencilIcon onClick={() => setItem(item)} />
									</Cell>
								</Row>
							)}
						/>
					)}

					<Flex justify="space-between" padding="30px 10px 0">
						<Button
							inline
							hidden={!data.posts.links.prev}
							buttonType="text"
							text="Prev"
							onClick={() => handlePrev(data.posts.links.prev)}
						/>
						<Button
							inline
							hidden={!data.posts.links.next}
							buttonType="text"
							text="Next"
							onClick={() => handleNext(data.posts.links.next)}
						/>
					</Flex>
				</Flex>
			</Container>

			{state.isOpen && (
				<Modal
					size="small"
					closeIcon={false}
					isOpen={state.isOpen}
					closeModal={handleClose}
					title={isEditMode ? t('Edit') : t('Add')}
				>
					<Form onSubmit={onSubmit} defaultValues={defaultValues}>
						<FormInput name="title" label={t('Title')} readOnly={isEditMode} disabled={isEditMode} />
						<FormInput name="body" label={t('Text')} />
						<ErrorText center show={Boolean(error)} text={t('Error')} />
						<Button type="submit" text={t('Save')} loading={addLoading || updateLoading} />
					</Form>
				</Modal>
			)}

			{isOpen && (
				<Modal size="large" closeIcon={false} isOpen={isOpen} closeModal={closeModal}>
					<H2 margin="0 0 20px">{selected.title}</H2>
					<Flex justify="space-between" padding="0 0 20px">
						<H6>
							{t('By ')}
							<strong>{selected.user?.name}</strong> ({selected.user?.email})
						</H6>
					</Flex>
					<H5>{selected.body}</H5>

					<H4 padding="20px 0 0">{t('Comments:')}</H4>

					<Accord>
						{selected.comments?.data?.map(comment => (
							<AccordionSection key={comment.id} title={comment.email}>
								{comment.body}
							</AccordionSection>
						))}
					</Accord>
				</Modal>
			)}
		</>
	);
};

export default Posts;
