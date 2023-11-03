// import { Announcement } from '../types';

import { t } from 'i18next';
import Modal from '@/components/Modal';
import { ChangeEvent, useState } from 'react';
import Announcement from '../../Dashboard/components/Announcement';
import AnnouncementDetails from './AnnouncementDetails';
import { AnnouncementType, PostAnnouncement, Target } from '@/utils/types';
import {
  useAddAnnouncementMutation,
  useDeleteAnnouncementMutation,
  useGetAllAnnouncementsQuery,
  useUpdateAnnouncementMutation,
} from '@/redux/services/announcementsApi';
import { toast } from 'react-toastify';
import { BiSolidPlusSquare } from 'react-icons/bi';
import { useAppSelector } from '@/redux/hooks';
// import { announcement } from '../../../utils/pages';
import {
  HiOutlinePencil,
  HiOutlineTrash,
  HiPencil,
  HiTrash,
} from 'react-icons/hi2';

const initialState: AnnouncementType = {
  author: {
    name: '',
    first_surname: '',
  },
  category: {
    id: -1,
    name: '',
  },
  content: '',
  createdAt: '',
  expiresAt: '',
  id: -2,
  image: '',
  target: [''],
  title: '',
  updatedAt: '',
};

enum Type {
  'new',
  'update',
  'delete',
}

function AnnouncementTable(): JSX.Element {
  const [addAnnouncement] = useAddAnnouncementMutation();
  const [updateAnnouncement] = useUpdateAnnouncementMutation();
  const [deleteAnnouncement] = useDeleteAnnouncementMutation();

  // const [page, setPage] = useState(1);

  const size = 10;

  const {
    data: announcement,
    isLoading,
    isSuccess,
  } = useGetAllAnnouncementsQuery({
    // page,
    page: 1,
    size,
  });

  const { name, first_surname } = useAppSelector(state => state.userReducer);

  const [selectedAnnouncement, setSelectedAnnouncement] =
    useState<AnnouncementType>(initialState);

  const [type, setType] = useState<Type>(Type.update);

  const openDetailsModal = () => {
    return (
      selectedAnnouncement.id >= -1 &&
      (type === Type.update || type === Type.new)
    );
  };

  const openDeleteModal = () => {
    return selectedAnnouncement.id >= 0 && type === Type.delete;
  };

  const detailsModal = ({
    announcement,
  }: {
    announcement: AnnouncementType;
  }) => {
    setSelectedAnnouncement(announcement);
    setType(Type.update);
  };

  const deleteModal = ({
    announcement,
  }: {
    announcement: AnnouncementType;
  }) => {
    setSelectedAnnouncement(announcement);
    setType(Type.delete);
  };

  const closeModal = () => {
    setSelectedAnnouncement(initialState);
  };

  const newAnnouncement = () => {
    const author = {
      name,
      first_surname,
    };
    setSelectedAnnouncement({
      ...initialState,
      author,
      id: -1,
    });
    setType(Type.new);
  };

  const onChangeForm = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setSelectedAnnouncement(prevState => {
      const { name } = e.target;
      switch (name) {
        case 'title': {
          const title = e.target.value;
          return { ...prevState, title };
        }
        case 'content': {
          const content = e.target.value;
          return { ...prevState, content };
        }
        case 'image': {
          const image = e.target.value;
          console.log(image);
          return { ...prevState, image };
        }
        case 'expiresAt': {
          const expiresAt = e.target.value;
          return { ...prevState, expiresAt };
        }
        case 'target': {
          const { value, label } = JSON.parse(e.target.value);
          const target = [
            {
              id: value,
              name: label,
            },
          ];
          // const target = e.target.value.split(', ');
          // if (target.length === 1 && target[0] === '') {
          // 	return { ...prevState, target: [] };
          // }
          return { ...prevState, target };
        }
        case 'category': {
          const value = JSON.parse(e.target.value);
          const category = {
            id: value.value,
            name: value.label,
          };
          // console.log(category);
          return { ...prevState, category };
        }
        default:
          return prevState;
      }
    });
  };

  const onSave = () => {
    const {
      category: { name: category },
      content,
      expiresAt,
      image,
      target: t,
      title,
    } = selectedAnnouncement;

    const target = t.map(({ name }: Target) => name);

    const body: PostAnnouncement = {
      category,
      content,
      expiresAt,
      image,
      target,
      title,
    };

    switch (type) {
      case Type.new: {
        console.log(body);
        addAnnouncement({ body })
          .unwrap()
          .then(res => {
            toast.success(res.msg);

            closeModal();
          })
          .catch(err => {
            console.log(err);
          });
        break;
      }
      case Type.update: {
        const id = selectedAnnouncement.id;
        //TODO: fix this
        console.table({ id, body });
        updateAnnouncement({ id, body })
          .unwrap()
          .then(res => {
            toast.success(res.msg);
            closeModal();
          })
          .catch(err => {
            console.log(err);
          });
        break;
      }
    }
  };

  const onDelete = () => {
    const id = selectedAnnouncement.id;
    deleteAnnouncement({ id })
      .unwrap()
      .then(res => {
        toast.success(res.msg);
        closeModal();
      })
      .catch(err => {
        console.log(err);
      });
  };

  // useEffect(() => {
  // 	if (isSuccess && announcement.data.length >= 1)
  // 		setSelectedAnnouncement(announcement.data[0]);
  // }, [announcement]);

  return (
    <>
      {isLoading && (
        <>
          <h1>Loading...</h1>
        </>
      )}
      {isSuccess && (
        <table className="table-announcement-list">
          <thead>
            <tr data-title>
              <th>
                <p>{t('announcement')}</p>
                <BiSolidPlusSquare
                  className="biSolidPlusSquare"
                  onClick={newAnnouncement}
                />
              </th>
            </tr>
            <tr className="grid">
              <th>Nº</th>
              <th>{t('title')}</th>
              <th>{t('created')}</th>
              <th>{t('updated')}</th>
              <th>{t('expires')}</th>
              <th>{t('actions')}</th>
            </tr>
          </thead>
          <tbody>
            {announcement.data.map((announcement, index) => {
              const {
                id,
                title,
                createdAt: cAt,
                updatedAt: uAt,
                expiresAt: eAt,
              } = announcement;

              const createdAt = new Date(cAt).toLocaleDateString('es-CL', {
                timeZone: 'UTC',
              });
              const updatedAt = new Date(uAt).toLocaleDateString('es-CL', {
                timeZone: 'UTC',
              });
              const expiresAt = new Date(eAt).toLocaleDateString('es-CL', {
                timeZone: 'UTC',
              });

              return (
                <tr
                  key={id}
                  className="grid"
                >
                  <td>{index + 1}</td>
                  <td>{title}</td>
                  <td>{createdAt}</td>
                  <td>{updatedAt}</td>
                  <td>{expiresAt}</td>
                  <td>
                    <div
                      className="actions"
                      onClick={() => detailsModal({ announcement })}
                    >
                      <HiPencil className="hiPencil" />
                      <HiOutlinePencil className="hiOutlinePencil" />
                    </div>
                    <div
                      className="actions"
                      onClick={() => deleteModal({ announcement })}
                    >
                      <HiTrash className="hiTrash" />
                      <HiOutlineTrash className="hiOutlineTrash" />
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
      <Modal
        className="details"
        isOpen={openDetailsModal}
        title={t('announcement_details')}
        footer={
          <>
            <button onClick={onSave}>{t('save')}</button>
            <button onClick={closeModal}>{t('cancel')}</button>
          </>
        }
        onClick={closeModal}
      >
        <AnnouncementDetails
          announcement={selectedAnnouncement}
          onChange={onChangeForm}
        />
        <hr />
        <section>
          <Announcement announcement={selectedAnnouncement} />
        </section>
      </Modal>
      <Modal
        className="delete"
        isOpen={openDeleteModal}
        title={t('delete_announcement')}
        footer={
          <>
            <button onClick={onDelete}>{t('delete')}</button>
            <button onClick={closeModal}>{t('cancel')}</button>
          </>
        }
        onClick={closeModal}
      >
        <p>{t('delete_announcement_message')}</p>
      </Modal>
    </>
  );
}

export default AnnouncementTable;
