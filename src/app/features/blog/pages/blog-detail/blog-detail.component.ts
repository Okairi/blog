import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  Firestore,
  doc,
  getDoc,
  collection,
  query,
  where,
  getDocs,
  addDoc,
  Timestamp,
} from '@angular/fire/firestore';
import { Auth, onAuthStateChanged } from '@angular/fire/auth';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { LoadingComponent } from '../../../../shared/components/loading/loading.component';

@Component({
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrl: './blog-detail.component.css',
  standalone: true,
  imports: [CommonModule, FormsModule, LoadingComponent],
})
export class BlogDetailComponent implements OnInit {
  blog: any = null;
  comments: any[] = [];
  displayedComments: any[] = [];
  newComment: string = '';
  isLoading: boolean = true;

  currentPage: number = 1;
  commentsPerPage: number = 10;

  constructor(
    private route: ActivatedRoute,
    private firestore: Firestore,
    private auth: Auth
  ) {
    onAuthStateChanged(this.auth, (user) => {
      if (user) {
        const defaultName = user.email?.split('@')[0] || 'Usuario';
        localStorage.setItem('username', defaultName);
      }
    });
  }

  async ngOnInit() {
    const blogId = this.route.snapshot.paramMap.get('id');
    if (blogId) {
      await this.loadBlog(blogId);
      await this.loadComments(blogId);
    }
    this.isLoading = false;
  }

  async loadBlog(blogId: string) {
    const blogRef = doc(this.firestore, 'blogs', blogId);
    const blogSnap = await getDoc(blogRef);
    if (blogSnap.exists()) {
      this.blog = { id: blogSnap.id, ...blogSnap.data() };
    }
  }

  async loadComments(blogId: string) {
    const commentsRef = collection(this.firestore, 'comments');
    const q = query(commentsRef, where('blog_id', '==', blogId));

    const commentsSnap = await getDocs(q);
    this.comments = commentsSnap.docs
      .map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))
      .sort(
        (a: any, b: any) => b.created_at?.toMillis() - a.created_at?.toMillis()
      ); // Ordenar manualmente

    this.updateDisplayedComments();
  }

  updateDisplayedComments() {
    const startIndex = (this.currentPage - 1) * this.commentsPerPage;
    this.displayedComments = this.comments.slice(
      startIndex,
      startIndex + this.commentsPerPage
    );
  }

  nextPage() {
    if (this.currentPage * this.commentsPerPage < this.comments.length) {
      this.currentPage++;
      this.updateDisplayedComments();
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updateDisplayedComments();
    }
  }

  async addComment() {
    if (!this.newComment.trim()) return;

    const user = this.auth.currentUser;
    if (!user) {
      Swal.fire({
        icon: 'warning',
        title: 'Error de envío.',
        text: 'Debes estar autenticado para comentar.',
        confirmButtonColor: '#3085d6',
      });

      return;
    }

    const username = localStorage.getItem('username') || 'Anónimo';

    await addDoc(collection(this.firestore, 'comments'), {
      blog_id: this.blog.id,
      author_id: user.uid,
      author_name: username,
      content: this.newComment.trim(),
      created_at: Timestamp.now(),
      parent_id: null,
    });

    this.newComment = '';
    await this.loadComments(this.blog.id);
  }
}
