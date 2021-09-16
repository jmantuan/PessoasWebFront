import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { Pessoa } from 'src/app/models/Pessoa';
import { PessoaService } from 'src/app/services/Pessoa.service';
import { ElementDialogComponent } from 'src/app/shared/element-dialog/element-dialog.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [PessoaService],
})
export class HomeComponent implements OnInit {
  @ViewChild(MatTable)
  table!: MatTable<any>;
  displayedColumns: string[] = ['nome', 'sobrenome', 'email', 'acoes'];
  dataSource!: Pessoa[];

  constructor(public dialog: MatDialog, public pessoaService: PessoaService) {
    this.pessoaService.getPessoas().subscribe((data: Pessoa[]) => {
      this.dataSource = data;
    });
  }

  ngOnInit(): void {}

  openDialog(element: Pessoa | null): void {
    const dialogRef = this.dialog.open(ElementDialogComponent, {
      width: '250px',
      data:
        element === null
          ? {
              nome: '',
              sobrenome: null,
              email: '',
            }
          : {
              id: element.id,
              nome: element.nome,
              sobrenome: element.sobrenome,
              email: element.email,
            },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result != undefined) {
        if (this.dataSource.map((p) => p.id).includes(result.id)) {
          this.pessoaService
            .updatePessoa(result.id, result)
            .subscribe((data: Pessoa) => {
              this.dataSource[result.position - 1] = data;
              this.pessoaService.getPessoas().subscribe((data: Pessoa[]) => {
                this.dataSource = data;
              });
              this.table.renderRows();
            });
        } else {
          this.pessoaService.createPessoa(result).subscribe((data: Pessoa) => {
            this.dataSource.push(result);
            this.table.renderRows();
          });
        }
      }
    });
  }

  deleteElement(id: number): void {
    this.pessoaService.deletePessoa(id).subscribe(() => {
      this.dataSource = this.dataSource.filter((p) => p.id !== id);
    });
  }

  editElement(element: Pessoa): void {
    this.openDialog(element);
  }

    getElementById(element: Pessoa | null): void {
      const dialogRef = this.dialog.open(ElementDialogComponent, {
        width: '250px',
        data:
          element === null
            ? {
                nome: '',
                sobrenome: null,
                email: '',
              }
            : {
                id: element.id,
                nome: element.nome,
                sobrenome: element.sobrenome,
                email: element.email,
              },
      });
  }
}
