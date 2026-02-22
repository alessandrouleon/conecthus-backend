// import { UserEntity } from '@/modules/user/domain/entities/user.entity';
// import { UserIterfaces } from '../types/user.types';
// describe('UserEntity', () => {
//   const validProps: UserIterfaces = {
//     id: '1',
//     name: 'Joao DoeA',
//     registration: '1234',
//     email: 'joao@example.com',
//     password: 'Admin@123',
//     isActive: true,
//     createdAt: new Date(),
//     updatedAt: new Date(),
//   };

//   it('should create a user with valid props', () => {
//     const user = new UserEntity(validProps);
//     expect(user.id).toBe('1');
//     expect(user.name).toBe(validProps.name);
//     expect(user.registration).toBe(validProps.registration);
//     expect(user.email).toBe(validProps.email);
//     expect(user.password).toBe(validProps.password);
//     expect(user.isActive).toBe(true);
//     expect(user.createdAt).toBeInstanceOf(Date);
//     expect(user.updatedAt).toBeInstanceOf(Date);
//   });

//   /**
//    * Verifica se o setter `name` funciona corretamente ao alterar o nome do usuário.
//    */
//   it('should update the name with setter', () => {
//     const user = new UserEntity(validProps);
//     user.name = 'Jane Doe'; // usa o setter
//     expect(user.name).toBe('Jane Doe');
//   });

//   /**
//    * Espera que, ao tentar definir o nome como vazio,
//    * a entidade lance um `DomainError`, pois o campo é obrigatório.
//    */
//   it('should throw error when setting empty name', () => {
//     const user = new UserEntity(validProps);
//     expect(() => (user.name = '')).toThrow('user: Name cannot be empty');
//   });

//   /**
//    * ✅ Caso de teste 4: Atualização de outros campos
//    *
//    * Testa se os setters de `username`, `email`, `password` e `role`
//    * funcionam corretamente quando recebem valores válidos.
//    */
//   it('should update registration, email, password, role with setters', () => {
//     const user = new UserEntity(validProps);

//     user.registration = '1234';
//     user.email = 'jane@example.com';
//     user.password = 'Admin@123';
//     user.isActive = false;

//     expect(user.registration).toBe('1234');
//     expect(user.email).toBe('jane@example.com');
//     expect(user.isActive).toBe(false);
//   });

//   /**
//    * Garante que todos os campos sensíveis (`registration`, `email`, `password`, `role`)
//    * não possam ser definidos como vazios. Cada setter deve lançar um `DomainError`.
//    */
//   it('should throw error when setting empty values for other fields', () => {
//     const user = new UserEntity(validProps);

//     expect(() => (user.registration = '')).toThrow(
//       'user: Registration cannot be empty',
//     );
//     expect(() => (user.email = '')).toThrow('user: Email cannot be empty');
//     expect(() => (user.password = '')).toThrow(
//       'user: Password cannot be empty',
//     );
//     expect(() => (user.roles = [])).toThrow('user: Roles are required');
//   });

//   /**
//    * Testa se o método `toJSON()` retorna a representação pública do usuário,
//    * sem incluir o campo `password` (por segurança).
//    */
//   it('should return correct JSON representation', () => {
//     const user = new UserEntity(validProps);
//     const json = user.toJSON();

//     expect(json).toEqual({
//       id: '1',
//       name: validProps.name,
//       username: validProps.username,
//       email: validProps.email,
//       roles: validProps.roles,
//       isActive: true,
//       createdAt: expect.any(Date),
//       updatedAt: expect.any(Date),
//       deletedAt: null,
//     });
//   });
// });
