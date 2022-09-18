export default {
  port: {
    doc: 'The API listening port. By default is 0 (ephemeral) which serves as a dynamic port for testing purposes. For production use, a specific port must be assigned',
    format: 'Number',
    default: 0,
    nullable: true,
    env: 'PORT',
  },
}
