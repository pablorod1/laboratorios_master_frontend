import * as apiModel from './api/project.api-model';
import * as viewModel from './project.vm';
import { mapProjectFromApiToVm } from './project.mapper';

describe('./pods/project/project.mapper', () => {
  it('should return an empty project when feeding undefined project', () => {
    // Arrange
    const project = undefined;

    // Act
    const result = mapProjectFromApiToVm(project as any);

    // Assert
    expect(result).toEqual(viewModel.createEmptyProject());
  });

  it('should return an empty project when feeding null project', () => {
    // Arrange
    const project = null;

    // Act
    const result = mapProjectFromApiToVm(project as any);

    // Assert
    expect(result).toEqual(viewModel.createEmptyProject());
  });

  it('should map project fields from api to vm', () => {
    // Arrange
    const project: apiModel.Project = {
      id: 'test id',
      name: 'test name',
      externalId: 'test external id',
      comments: 'test comments',
      isActive: true,
      employees: [],
    };

    const expectedResult: viewModel.Project = {
      id: 'test id',
      name: 'test name',
      externalId: 'test external id',
      comments: 'test comments',
      isActive: true,
      employees: [],
    };

    // Act
    const result = mapProjectFromApiToVm(project);

    // Assert
    expect(result).toEqual(expectedResult);
  });

  it('should map project employees from api to vm', () => {
    // Arrange
    const project: apiModel.Project = {
      id: 'test id',
      name: 'test name',
      externalId: 'test external id',
      comments: 'test comments',
      isActive: true,
      employees: [
        {
          id: 'test employee id 1',
          isAssigned: true,
          employeeName: 'test employee name 1',
        },
        {
          id: 'test employee id 2',
          isAssigned: false,
          employeeName: 'test employee name 2',
        },
      ],
    };

    const expectedResult: viewModel.Project = {
      id: 'test id',
      name: 'test name',
      externalId: 'test external id',
      comments: 'test comments',
      isActive: true,
      employees: [
        {
          id: 'test employee id 1',
          isAssigned: true,
          employeeName: 'test employee name 1',
        },
        {
          id: 'test employee id 2',
          isAssigned: false,
          employeeName: 'test employee name 2',
        },
      ],
    };

    // Act
    const result = mapProjectFromApiToVm(project);

    // Assert
    expect(result).toEqual(expectedResult);
  });

  it('should return empty employees when feeding project without employees', () => {
    // Arrange
    const project: apiModel.Project = {
      id: 'test id',
      name: 'test name',
      externalId: 'test external id',
      comments: 'test comments',
      isActive: true,
      employees: undefined,
    } as any;

    // Act
    const result = mapProjectFromApiToVm(project);

    // Assert
    expect(result.employees).toEqual([]);
  });
});
