import {
    Badge,
    BadgeProps,
    Button,
    Checkbox,
    Drawer,
    Form,
    FormListFieldData,
    Input,
    InputNumber,
    Space,
} from 'antd';
import './AddExercisesDrawer.scss';
import { CloseOutlined, MinusOutlined, PlusOutlined } from '@ant-design/icons';
import CONSTANTS from '@utils/constants';
import { ITrainingExercises } from '../../types/storeTypes';
import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../context/AppContext';
import { useFocus } from '@hooks/useFocus';

export interface IExercises {
    approaches?: number;
    name?: string;
    replays?: number;
    weight?: number;
    isImplementation?: boolean;
}

export interface IFormValues {
    exercises: IExercises[];
}

interface IProps {
    isOpen: boolean;
    onClose: (type: string) => void;
    trainingType: string;
    trainingName: string;
    date: string;
}

const defaultFormListValue = [
    { approaches: undefined, name: '', replays: undefined, weight: undefined },
];

export const AddExercisesDrawer = ({
    isOpen,
    onClose,
    trainingType,
    trainingName,
    date,
}: IProps) => {
    const { saveExercisesData, exercisesData } = useContext(AppContext);
    const [exerciseFields, setExerciseFields] = useState<IExercises[]>(exercisesData);
    const [implementationArr, setImplementationArr] = useState<{ value: boolean; id: number }[]>([
        { value: false, id: 0 },
    ]);
    const [isRemoveButtonDisabled, setIsRemoveButtonDisabled] = useState(true);
    const [inputRef, setInputFocus] = useFocus();

    useEffect(() => {
        setExerciseFields(exercisesData);

        const checkboxData = exercisesData.map((exercise, index) => {
            return { value: exercise.isImplementation, id: index };
        });

        setImplementationArr(checkboxData);

        const activeCheckbox = exercisesData.find((item) => {
            return item.isImplementation === true;
        });

        if (activeCheckbox) {
            setIsRemoveButtonDisabled(false);
        }
    }, [exercisesData]);

    const onValuesChange = (changedValues: IFormValues, allValues: IFormValues) => {
        if (allValues.exercises.length) {
            const filteredExercises = allValues.exercises.filter((item, index) => {
                if (item?.name?.length < 0) {
                    setImplementationArr(implementationArr.slice(index, 1));
                }
                return item?.name?.length > 0;
            });

            const activeCheckbox = implementationArr.find((item) => {
                return item.value === true;
            });

            if (activeCheckbox) {
                setIsRemoveButtonDisabled(false);
            }

            const exercises = filteredExercises.map((item, index) => {
                return {
                    name: item.name,
                    replays: item.replays || 1,
                    weight: item.weight || 0,
                    approaches: item.approaches || 1,
                    isImplementation:
                        changedValues.exercises[changedValues.exercises.length - 1]
                            ?.isImplementation || false,
                };
            });

            exercises.length ? setExerciseFields(exercises as ITrainingExercises[]) : null;
        }
    };

    const addField = (add: () => void) => {
        setImplementationArr((state) => {
            return [...state, { value: false, id: implementationArr.length }];
        });
        add();
    };

    const changeCheckboxState = (index: number) => {
        const currentElement = implementationArr.find((item) => {
            return item.id === index;
        });

        if (currentElement) {
            currentElement.value = !currentElement.value;
            implementationArr[index] = currentElement;
            setImplementationArr(implementationArr);
            setIsRemoveButtonDisabled(currentElement.value ? false : true);
        }
    };

    const closeDrawer = () => {
        exerciseFields.length ? saveExercisesData(exerciseFields as ITrainingExercises[]) : null;
        setExerciseFields([]);
        setIsRemoveButtonDisabled(true);

        onClose(CONSTANTS.DRAWER);
    };

    const removeItem = (remove: (field: number) => void, fields: FormListFieldData[]) => {
        const checkedItem = implementationArr.find((item) => item.value === true);

        if (checkedItem) {
            const itemForDelete = fields.find((item, index) => {
                if (index === checkedItem.id) {
                    return item;
                }
                return null;
            });

            if (itemForDelete) {
                const filteredArr = implementationArr.filter((item) => item.value !== true);
                setImplementationArr(
                    filteredArr.map((item, index) => {
                        return { value: item.value, id: index };
                    }),
                );

                remove(itemForDelete.name);

                setIsRemoveButtonDisabled(true);
            }
        }
    };

    return (
        <Drawer
            title={
                <span className='drawer__header'>
                    <PlusOutlined />
                    <h4 className='drawer__header_title'>
                        {exercisesData.length
                            ? 'Редактирование упражнений'
                            : 'Добавление упражнений'}
                    </h4>
                </span>
            }
            styles={{
                header: { borderBottom: 'none' },
                body: { padding: '0 24px 24px 24px' },
                mask: { background: 'transparent' },
            }}
            className='drawer__body'
            width={408}
            height={550}
            placement={window.innerWidth > 360 ? 'right' : 'bottom'}
            onClose={closeDrawer}
            open={isOpen}
            closable={false}
            destroyOnClose={true}
            data-test-id='modal-drawer-right'
            extra={
                <CloseOutlined
                    onClick={closeDrawer}
                    style={{ color: '#8c8c8c' }}
                    data-test-id='modal-drawer-right-button-close'
                />
            }
        >
            <article className='drawer__body_info'>
                <div>
                    <Badge color={trainingType as BadgeProps['color']} />
                    <span style={{ marginLeft: 6 }}>{trainingName}</span>
                </div>

                <span>{date}</span>
            </article>
            <Form
                name='add-exercises__form'
                onValuesChange={onValuesChange}
                autoComplete='off'
                className='add-exercises__form'
            >
                <Form.List
                    name='exercises'
                    initialValue={exercisesData.length ? exerciseFields : defaultFormListValue}
                >
                    {(fields, { add, remove }) => (
                        <>
                            {fields.map(({ key, name, ...restField }, index) => (
                                <Space
                                    key={key}
                                    style={{ display: 'flex', flexWrap: 'wrap', marginBottom: 8 }}
                                    align='baseline'
                                >
                                    <Form.Item
                                        {...restField}
                                        name={[name, 'name']}
                                        className='form-item'
                                        rules={[{ required: false }]}
                                    >
                                        <Input
                                            type='text'
                                            placeholder='Упражнение'
                                            className='form-input__exercise'
                                            data-test-id={`modal-drawer-right-input-exercise${index}`}
                                            ref={inputRef}
                                            onChange={setInputFocus}
                                            addonAfter={
                                                <Form.Item
                                                    {...restField}
                                                    name={[name, 'isImplementation']}
                                                    className='form-item'
                                                    rules={[{ required: false }]}
                                                >
                                                    <Checkbox
                                                        style={{ height: '24px !important' }}
                                                        onChange={() => changeCheckboxState(index)}
                                                        className='form-input__exercise'
                                                        data-test-id={`modal-drawer-right-checkbox-exercise${index}`}
                                                    />
                                                </Form.Item>
                                            }
                                        />
                                    </Form.Item>
                                    <div className='form-item__blok'>
                                        <span className='form-item__input-label'>Подходы</span>
                                        <span className='form-item__input-label'>Вес, кг</span>
                                        <span className='form-item__input-label'>Колличество</span>
                                    </div>
                                    <div className='form-item__blok'>
                                        <Form.Item
                                            {...restField}
                                            name={[name, 'replays']}
                                            className='form-item'
                                            rules={[{ required: false }]}
                                        >
                                            <InputNumber
                                                addonBefore='+'
                                                placeholder='1'
                                                className='form-item__input'
                                                data-test-id={`modal-drawer-right-input-approach${index}`}
                                            />
                                        </Form.Item>
                                        <Form.Item
                                            {...restField}
                                            name={[name, 'weight']}
                                            className='form-item'
                                            rules={[{ required: false }]}
                                        >
                                            <InputNumber
                                                placeholder='0'
                                                className='form-item__input'
                                                data-test-id={`modal-drawer-right-input-weight${index}`}
                                            />
                                        </Form.Item>
                                        <Form.Item
                                            {...restField}
                                            name={[name, 'approaches']}
                                            className='form-item'
                                            rules={[{ required: false }]}
                                        >
                                            <InputNumber
                                                placeholder='3'
                                                className='form-item__input'
                                                data-test-id={`modal-drawer-right-input-quantity${index}`}
                                            />
                                        </Form.Item>
                                    </div>
                                </Space>
                            ))}
                            <div className='buttons-group'>
                                <Form.Item>
                                    <Button
                                        type='link'
                                        onClick={() => addField(() => add())}
                                        block
                                        icon={<PlusOutlined />}
                                        className='add-form-item__btn'
                                    >
                                        Добавить ещё
                                    </Button>
                                </Form.Item>
                                {fields.length ? (
                                    <Form.Item>
                                        <Button
                                            type='link'
                                            onClick={() => removeItem(remove, fields)}
                                            block
                                            icon={<MinusOutlined />}
                                            className='remove-form-item__btn'
                                            disabled={isRemoveButtonDisabled}
                                        >
                                            Удалить
                                        </Button>
                                    </Form.Item>
                                ) : null}
                            </div>
                        </>
                    )}
                </Form.List>
            </Form>
        </Drawer>
    );
};
