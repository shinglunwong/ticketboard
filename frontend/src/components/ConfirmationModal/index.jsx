import { Modal, Title, Group, Button } from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";

const ConfirmationModal = ({ title, subtitle, opened, onClose, onConfirm, isLoading }) => {
  return (
    <Modal opened={opened} onClose={onClose} title={title} centered>
      <Title order={5} mb="sm">
        {subtitle}
      </Title>
      <Group justify="flex-end">
        <Button variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button
          color="red"
          onClick={onConfirm}
          loading={isLoading}
          leftSection={<IconTrash size={16} />}
        >
          Delete
        </Button>
      </Group>
    </Modal>
  );
};

export default ConfirmationModal;
